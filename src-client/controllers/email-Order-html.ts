
interface product {
    "title": string,
    "unit_price": number,
    "picture_url": string,
    "quantity": number
}


interface data {
    "orders": [
        {
            "addressOrder": {
                "zip_code": number,
                "street_name": string,
                "street_number": number,
                "phone": {
                    "number": number,
                    "area_code": number
                }
            },
            "purchasedProducts": product[],
            "status": string,
            "delivery_time": string,
            "total": number
        }
    ]
}

export default function CreationOfHTML(myorder: data | any, email: string, name: string, id: string) {
    if (!myorder) return `<div>NO FOUNT</div>`

    const myproducHTML = myorder.orders[0].purchasedProducts.map((e: any) => {
        return (
            `
          <section
            style="display: flex; flex-direction: column; margin: auto"
          >
            <article
              style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                padding: 0 2em;
                margin: auto;
                padding-bottom: 1em;
                margin-bottom: 1em;
                border-bottom: 1px solid rgb(211, 208, 208);
                width: 500px;
              "
            >
              <img
                height="100"
                width="100"
                src=${e.picture_url}
                alt="none"
                style="margin-right: 2em"
              />
              <article
                style="
                text-align: left;
                "
              >
                <div style="position: relative; margin: 0; padding: 0; padding-bottom: 0.5em">
                  ${e.title}
                </div>
                <div style="position: relative; margin: 0; padding: 0; padding-bottom: 0.5em">
                  Price: ${e.unit_price}
                </div>
                <div style="position: relative; margin: 0; padding: 0; padding-bottom: 0.5em">
                  Quantity: ${e.quantity}
                </div>
              </article>
            </article>
            </section>
            `
        )
    }).join("")




    return `
  <body
      style="
        font-family: Helvetica, sans-serif;
        font-size: 1em;
        margin: 3em;
        padding: 0;
      "
    >
      <p style="float: right; margin-top: auto; color: grey;">Order ${id}</p>
  
      <p style="padding-top: 2em;">Hello ${name},</p>
  
      <div style="text-align: center">
        <section>
          <header
            style="font-size: 1.5em; color: rgb(248, 159, 174); font-weight: bold;"
          >
            MERCI!
          </header>
  
          <div>
            <p>
              Thanks for your order with Sirun Pâtisserie, we are so excited to
              send you your yummy products!
            </p>
            <p>
              You will receive an email with the tracking number when your order
              ships. For delivery times, please check
              <a
                href="https://sirunnpatisserie.vercel.app/about#shipping"
                style="
                  color: rgb(248, 159, 174);
                  font-style: italic;
                  text-decoration: underline;
                "
                >here</a
              >.
            </p>
            <br />
            <a
              href="https://sirunnpatisserie.vercel.app/about#newsletter"
              style="
                color: rgb(248, 159, 174);
                font-style: italic;
                text-decoration: underline;
              "
            >
              Did you sign up to our newsletter?
            </a>
            <p>
              Be the first to know about the latests news! Get exclusive offers
              with inspirational and styling tips!
            </p>
            <br />
            <p style="font-style: italic">Best wishes,</p>
            <p
              style="
                font-size: 1.3em;
                color: rgb(248, 159, 174);
                font-weight: bold;
                font-style: italic;
              "
            >
              Sirun Pâtisserie
            </p>
          </div>
        </section>
  
        <br />
        <div style="border-bottom: 1px solid rgb(211, 208, 208)"></div>
        <br /><br /><br />
  
        <section style="text-align: center">
          <header
            style="
              color: rgb(248, 159, 174);
              font-weight: bold;
              font-size: 1em;
            "
          >
            ORDER SUMMARY
          </header>
        </section>
  
        <br />
        <section style="font-size: 1em">
          <article>
            <header>
              <p style="font-weight: bold; text-decoration: underline">
                Products
              </p>
            </header>
            <section>
                  ${myproducHTML}
            </section>
  
            <div>
              <p>Confirmation date: FALTA VER ESOOOOO</p>
              <p>Delivery times: ${myorder.orders[0].delivery_time}</p>
              <p>Total: ${myorder.orders[0].total}</p>
            </div>
          </article>
        </section>
  
        <br /><br />
        <div style="border-bottom: 1px solid rgb(211, 208, 208)"></div>
        <br /><br /><br />
  
        <section style="text-align: center">
          <article>
            <header
              style="
                color: rgb(248, 159, 174);
                font-weight: bold;
                font-size: 1em;
              "
            >
              COSTUMER INFORMATION
            </header>
  
            <div style="font-size: 1em;">
              <p>Name: ${name}</p>
              <p>Email: ${email}</p>
              <p>Phone: ${myorder.orders[0].addressOrder.phone.number}</p>
              <p>Zip code: ${myorder.orders[0].addressOrder.phone.area_code}</p>
            </div>
          </article>
        </section>
  
        
        <footer>
          <p style="margin: 5em 0;">Thanks for your purchase</p>
        </footer>
  
      </div>
    </body>
  
  
  `
}