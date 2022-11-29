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
            "status": string,
            "delivery_time": string,
            "total": number
        }
    ]
}

export default function CreationOfHTML(myorder: data | any, name: string, id: string) {
    if (!myorder) return `<div>NO FOUNT</div>`

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
              YOUR ORDER IS ON IT'S WAY!
            </header>
    
            <div>
              <p>
                We are happy to inform you that your order is already on it's way to you!
              </p>
              <p>
                You'll soon receive an email from our delivery service with your tracking number.
              </p>

              <br />

              <p>
                Delivery time: ${myorder.delivery_time}
              </p>
              <p>
                Shipping address: ${myorder.street_name + " " + myorder.street_number + ", zip code: " + myorder.zip_code}
              </p>
              <br />
              <p
                href="https://sirunnpatisserie.vercel.app/about#newsletter"
                style="
                  color: rgb(248, 159, 174);
                  font-style: italic;
                  text-decoration: underline;
                "
              >
                Did you sign up to our newsletter?
              </p>
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
      </body>
  `
}