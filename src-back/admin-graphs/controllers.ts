const months = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December',
}

export const orderToSales = async (orders: any) => {
    const years = {
        2022: {},
        2023:{},
        2024:{},
        2025:{},
        2026:{},
        2027:{},
        2028:{},
        2029:{},
        2030:{},
    }

   await  orders.forEach((order: any) => {
        
        const year: any = parseInt(order.date.toString().split(' ')[3])
        const month: any = order.date.toString().split(' ')[1]
        const day: any = parseInt(order.date.toString().split(' ')[2])
        let week = ''
        if(day <= 7) week= 'week 1';
        if(day > 7 && day <= 14) week= 'week 2';
        if(day > 14 && day <= 21) week= 'week 3';
        if(day > 21 && day <= 28) week= 'week 4';
        if(day > 28) week= 'week 5';
        
        const numberWeek: number = parseInt(week.split(' ')[1]) - 1


        if(!years[year].hasOwnProperty(months[month])){
            years[year][months[month]] = [
                {
                week: 'week 1',
                sales: 0,
                confirmed: 0,
                fulfilled: 0,
                in_process: 0,
                in_transit: 0,
                canceled: 0
                },
                {
                week: 'week 2',
                sales: 0,
                confirmed: 0,
                fulfilled: 0,
                in_process: 0,
                in_transit: 0,
                canceled: 0
                },
                {
                week: 'week 3',
                sales: 0,
                confirmed: 0,
                fulfilled: 0,
                in_process: 0,
                in_transit: 0,
                canceled: 0
                },
                {
                week: 'week 4',
                sales: 0,
                confirmed: 0,
                fulfilled: 0,
                in_process: 0,
                in_transit: 0,
                canceled: 0
                }
         ]
        }

        if(years[year][months[month]][numberWeek]){
            years[year][months[month]][numberWeek].sales++;
            if(order.status === 'confirmed') years[year][months[month]][numberWeek].confirmed++
            if(order.status === 'fulfilled') years[year][months[month]][numberWeek].fulfilled++;
            if(order.status === 'in_process') years[year][months[month]][numberWeek].in_process++;
            if(order.status === 'in_transit') years[year][months[month]][numberWeek].in_transit++;
            if(order.status === 'canceled') years[year][months[month]][numberWeek].canceled++;
        } else {
            years[year][months[month]].push({
                week: 'week 5',
                sales: 0,
                confirmed: 0,
                fulfilled: 0,
                in_process: 0,
                in_transit: 0,
                canceled: 0
            })
            years[year][months[month]][numberWeek].sales++;
            if(order.status === 'confirmed') years[year][months[month]][numberWeek].confirmed++;
            if(order.status === 'fulfilled') years[year][months[month]][numberWeek].fulfilled++;
            if(order.status === 'in_process') years[year][months[month]][numberWeek].in_process++;
            if(order.status === 'in_transit') years[year][months[month]][numberWeek].in_transit++;
            if(order.status === 'canceled') years[year][months[month]][numberWeek].canceled++;
        }
    })
    return years
}

export const productMVP = async (products: any, type: any) => {
    if(type){
        const aux = await products.filter((prod : any) => prod.evaluation.length > 0 && prod.category === type ).sort((a: any, b:any) => {
           return b.evaluation.length - a.evaluation.length
        })
    
        const aux2: any = await aux.map(prod => {
            let rating = 0
            prod.evaluation.forEach((ev: any) => rating = rating + ev.rating)
            const cuantity = prod.evaluation.length 
            const prom: any = rating / cuantity
            return {
                name: prod.name,
                rating: prom
            }
        }).sort((a: any, b: any) => {
            return b.rating - a.rating
    
        })
    
        return aux2

    } else {
        const aux = await products.filter((prod : any) => prod.evaluation.length > 0 ).sort((a: any, b:any) => {
            return b.evaluation.length - a.evaluation.length
         })
     
         const aux2: any = await aux.map(prod => {
             let rating = 0
             prod.evaluation.forEach((ev: any) => rating = rating + ev.rating)
             const cuantity = prod.evaluation.length 
             const prom: any = rating / cuantity
             return {
                 name: prod.name,
                 rating: prom
             }
         }).sort((a: any, b: any) => {
             return b.rating - a.rating
     
         })
     
         return aux2
    }
}

export const MSProducts = async (products: any, type: string | undefined | string[]) => {    
    if(type){
        const productsWithOrders = await products.filter((prod: any) => prod.order.length > 0 && prod.category === type).map((prod: any) => {
            let orders = 0
            const aux = prod.order.forEach((ord: any) => {
                if(ord.status === 'confirmed') orders = orders + 1
            })
    
            return {
                name: prod.name,
                orders,
            }
        }).sort((a: any, b: any) => {
            return b.orders - a.orders
        })
            return productsWithOrders
    } else {
        const productsWithOrders = await products.filter((prod: any) => prod.order.length > 0).map((prod: any) => {
        let orders = 0
        const aux = prod.order.forEach((ord: any) => {
            if(ord.status === 'confirmed') orders = orders + 1
        })

        return {
            name: prod.name,
            orders,
        }
    }).sort((a: any, b: any) => {
        return b.orders - a.orders
    })
        return productsWithOrders
    }
    
    

    
}