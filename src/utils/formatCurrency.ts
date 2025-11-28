const CURRENCY_FORMATER=new Intl.NumberFormat('pt-BR', {
    style:'currency',
    currency:'BRL',
    minimumFractionDigits:0,
    
});

export function formatCurrency(value:number){
    return CURRENCY_FORMATER.format(value);
}