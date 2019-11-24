import * as express from "express";
import { IOrder, IBilling, IShipping } from "./interfaces/order.interface";
import { createOrder } from "./services/order.service";
import * as bodyParser from "body-parser";
const app = express();
var WooCommerceAPI = require("@woocommerce/woocommerce-rest-api").default;
const Woocommerce = new WooCommerceAPI({
    url: "https://luffbrand.com/",
    consumerKey: "ck_a8850f16b0b151d64ffef2684af33101de6743d3",
    consumerSecret: "cs_e2c18d84f09986cdd91d330f110ca6f671722b36",
    version: "wc/v3",
    wpAPI: true
});
const omise = require('omise')({
    'secretKey': 'skey_test_5g2u8v0c1dkc7ol9wga',
    'omiseVersion': '2019-05-29'
});

app.use(express.static("public"));
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(`/order`, async (req, res) => {
    try {
        console.time(`order`)
        const billing = req.body.billing as IBilling;
        const shipping = req.body.shipping as IShipping;
        const { token } = req.body

        const customer = await omise.customers.create({
            'email': 'john.doe@example.com',
            'description': 'John Doe (id: 30)',
            'card': token
        }, function (err, customer) {
            if (err) throw err
            return customer
        });
        const startDate = new Date().toJSON().split(`T`)[0]
        const endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toJSON().split(`T`)[0]
        await omise.schedules.create({
            'every': 1,
            'period': 'day',
            'start_date': startDate,
            'end_date': endDate,
            'charge': {
                'customer': customer.id,
                'amount': 100000,
                'description': 'X4 COLLAGEN PEPTIDE (แพคเกจรายเดือน) × 1'
            },
        });
        const order = createOrder(billing, shipping);
        await Woocommerce.post(`orders`, order);
        res.redirect(`https://luffbrand.com/`)
        console.timeEnd(`order`)
    } catch (error) {
        console.log(error.response);
        res.sendStatus(500);
    }
});

app.get(`/omise/callback`, async (req, res) => {
    res.sendStatus(200)
})

app.listen(3333, () => {
    console.log(`App listen at port 3333`);
});

console.log()