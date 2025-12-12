import express from "express";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
const app = express();
import { invoice, items, user } from "../models/merge.js";

export const createInvoice = async (req, res) => {
  console.log(req.body);
  try {
    const val = req.body;
    let item = val.items;
    const user_login = req.user.id;
    console.log(user_login);
    let grandtotal = 0;
    // for (let i of item){
    //      i.itemSubUnitTotal=(i.itemQuantity*i.itemUnitPrice)
    //      i.itemGst=((i.itemGstPer/100)*i.itemSubUnitTotal)
    //      grandtotal+=i.itemSubUnitTotal;
    // }
    const invoice_latest = await invoice.create({
      billTo: val.billTo,
      invoiceDate: val.invoiceDate,
      grandTotal: val.grandTotal,
      invoiceDate: val.invoiceDate,
      user_id: user_login,
    });
    for (let i of item) {
      i.invoiceId = invoice_latest.invoiceId;
    }
    await items.bulkCreate(item);
    res.status(200).json({ message: "created succesfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "create unsuccessful" });
  }
};
export const getInvoice = async (req, res) => {
  try {
    const req_id = req.user.id;
    let page=parseInt(req.query.page)||1;
    let sort=req.query.sort;
    let search=req.query.search;
    console.log("Search : "+search)
    let limit=2;
    let offset=(page-1)*limit;
    let order=[["invoiceId","DESC"]];
    if(sort==="DESC"){
      order=[["grandTotal","ASC"]];
    }
    if(sort==="ASEC"){
      order=[["grandTotal","DESC"]]
    }
    const whereCondition={user_id:req_id}
    if(search){
      whereCondition.billTo={[Op.like]:`${search}%`}
      console.log(whereCondition)
    }

    
    
    const {count,rows}=await invoice.findAndCountAll({
      distinct:true,
      col:'invoiceId',
      where:whereCondition,  // counts and rows are compulsory for destruction
      include:[
        {
          model:items,
          as:'items'
        }
      ],
      limit:limit,
      offset:offset,
      order,
      
    })
  
     res.status(200).json({ total:count,page:page,perPage:limit,totalPage:Math.ceil(count/limit),invoices:rows });
  
   
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "did not get company" });
  }
};
export const getInvoiceUpdate = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const userLogIn = req.user.id;
    if (!invoiceId) {
      return res.status(400).json({ message: "Invoice Id not found" });
    }
    const invoiceUpdate = await invoice.findOne({
      where: { invoiceId: invoiceId, user_id: userLogIn },
      include: [
        {
          model: items,
          as: "items",
        },
      ],
    });

    res.status(200).json({ message: invoiceUpdate });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "list update error" });
  }
};
export const updateInvoice = async (req, res) => {
  try {
    const update_id = req.params.id;
    const update_result = req.body;
    console.log(update_result);
    const user_login = req.user.id;
    let item = update_result.items;
    let grandtotal = 0;
    // for (let i of item){
    //      i.itemSubUnitTotal=(i.itemQuantity*i.itemUnitPrice)
    //      i.itemGst=((i.itemGstPer/100)*i.itemSubUnitTotal)
    //      grandtotal+=i.itemSubUnitTotal;
    // }
    const invoice_latest = await invoice.update(
      {
        billTo: update_result.billTo,
        invoiceDate: update_result.invoiceDate,
        grandTotal: update_result.grandTotal,
        invoiceDate: update_result.invoiceDate,
        user_id: user_login,
      },
      { where: { invoiceId: update_id } }
    );
    const listItem = await items.findAll({ where: { invoiceId: update_id } });
    for (let i of item) {
      i.invoiceId = update_id;
    }
    const updatedItem = item.filter((i) => i.itemId).map((i) => i.itemId);
    await items.destroy({
      where: { invoiceId: update_id, itemId: { [Op.notIn]: updatedItem } },
    });
    const ress = await items.bulkCreate(item, {
      updateOnDuplicate: [
        "itemName",
        "itemQuantity",
        "itemUnitPrice",
        "itemSubUnitTotal",
        "itemGstPer",
        "itemGst",
      ],
    });

    res.status(200).json({ message: "updated succesfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "update unsuccessful" });
  }
};
// export const updateInvoice = async (req, res) => {
//   try {
//     const update_id = req.params.id;
//     const update_result = req.body;
//     const user_login = req.user.id;

//     // Calculate totals
//     let grandtotal = 0;
//     for (let i of update_result.items) {
//       i.itemSubUnitTotal = i.itemQuantity * i.itemUnitPrice;
//       i.itemGst = (i.itemGstPer / 100) * i.itemSubUnitTotal;
//       grandtotal += i.itemSubUnitTotal;
//     }

//     // Update invoice main table
//     await invoice.update(
//       {
//         billTo: update_result.billTo,
//         invoiceDate: update_result.invoiceDate,
//         grandTotal: grandtotal,
//         user_id: user_login
//       },
//       { where: { invoiceId: update_id } }
//     );

//     // UPSERT items one by one (PostgreSQL safe)
//     for (const it of update_result.items) {
//       await items.upsert({
//         itemId: it.itemId || null, // if new → insert
//         itemName: it.itemName,
//         itemQuantity: it.itemQuantity,
//         itemUnitPrice: it.itemUnitPrice,
//         itemSubUnitTotal: it.itemSubUnitTotal,
//         itemGstPer: it.itemGstPer,
//         itemGst: it.itemGst,
//         invoiceId: update_id
//       });
//     }

//     return res.status(200).json({ message: "updated successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "update unsuccessful" });
//   }
// };

export const deleteInvoice = async (req, res) => {
  try {
    const del_id = req.params.id;
    if (!del_id) {
      return res
        .status(400)
        .json({ message: "id not provided please provide id" });
    }
    await items.destroy({ where: { invoiceId: del_id } });
    await invoice.destroy({ where: { invoiceId: del_id } });
    res.status(202).json({ message: "Delete Successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "delete unsuccessful" });
  }
};
