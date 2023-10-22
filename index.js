const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middlewares
// const corsConfig = {
//     origin: '',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
// }
// app.use(cors(corsConfig))
app.use(cors());
// app.options("", cors(corsConfig))

app.use(express.json());



console.log(process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bgmtqy5.mongodb.net/?retryWrites=true&w=majority`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)


        const brandsCollection = client.db("brandsDB").collection("brand");
        const cartCollection = client.db("brandsDB").collection("cart");

        app.get('/products', async (req, res) => {
            const cursor = brandsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // nike
        app.get('/products/Nike', async (req, res) => {
            const query = { brandName: "Nike" };
            const result = await brandsCollection.find(query).toArray();
            res.send(result);
        })

        // adidas
        app.get('/products/Adidas', async (req, res) => {
            const query = { brandName: "Adidas" };
            const result = await brandsCollection.find(query).toArray();
            res.send(result);
        })

        // gucci
        app.get('/products/Gucci', async (req, res) => {
            const query = { brandName: "Gucci" };
            const result = await brandsCollection.find(query).toArray();
            res.send(result);
        })

        // zara
        app.get('/products/Zara', async (req, res) => {
            const query = { brandName: "Zara" };
            const result = await brandsCollection.find(query).toArray();
            res.send(result);
        })

        // h&m
        app.get('/products/H&M', async (req, res) => {
            const query = { brandName: "H&M" };
            const result = await brandsCollection.find(query).toArray();
            res.send(result);
        })

        // levi's
        app.get("/products/Levi's", async (req, res) => {
            const query = { brandName: "Levi's" };
            const result = await brandsCollection.find(query).toArray();
            res.send(result);
        })

        // single product
        app.get("/products/:name/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await brandsCollection.findOne(query);
            res.send(result);
        })

        //    get cart
        app.get("/carts", async (req, res) => {
            const cursor = cartCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // update
        app.get("/update/:name/:id", async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await brandsCollection.findOne(query);
            res.send(result);
        })

        app.put("/products/:name/:id", async(req, res) => {
            const id = req.params;
            const filter = { _id: new ObjectId(id) };
            const options = {upsert:true};
            const updatedProduct = req.body;
            const product = {
                $set: {
                    brandName: updatedProduct.brandName,
                    productName: updatedProduct.productName,
                    image: updatedProduct.image,
                    type: updatedProduct.type,
                    price: updatedProduct.price,
                    description: updatedProduct.description
                }
            }
            const result = await brandsCollection.updateOne(filter, product, options);
            res.send(result);
        })

        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const result = await brandsCollection.insertOne(newProduct);
            res.send(result);
        })

        app.post('/carts', async (req, res) => {
            const newProduct = req.body;
            const result = await cartCollection.insertOne(newProduct);
            res.send(result);
        })

        app.delete('/carts/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send('Welcome to brand shop');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});