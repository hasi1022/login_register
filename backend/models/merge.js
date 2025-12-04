import items from "./items.js";
import user from "./user.js";
import invoice from "./invoice.js";

user.hasMany(invoice,{
  foreignKey:'user_id',
  as:'invoices'
})
invoice.belongsTo(user,{
    foreignKey:'user_id',
    as:'user'
})
invoice.hasMany(items,{
    foreignKey:'invoiceId',
    as:'items'
})
items.belongsTo(invoice,{
    foreignKey:'invoiceId',
    as:'invoice'
})

export {user,items,invoice}