const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const categoryData = await Category.findAll({ include: [Product] });

        if (!categoryData) {
            return res.status(404).json("no categorys found!");
        }

        return res.status(200).json(categoryData);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [Product],
        });

        if (!categoryData) {
            return res.status(404).json({ message: "id not found!" });
        }

        return res.status(200).json(categoryData);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    // create a new category
    try {
        const categoryData = await Category.create(req.body);
        if (categoryData) {
            return res.status(200).json(categoryData);
        } else {
            return res.status(500);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.put("/:id", (req, res) => {
    // update a category by its `id` value
    try {
        const categoryData = Category.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!categoryData) {
            return res.status(404).json({ message: "id not found!" });
        }
        return res.status(200).json(categoryData);
    } catch (err) {}
});

router.delete("/:id", async (req, res) => {
    // delete a category by its `id` value
    try {
        await Category.destroy({ where: { id: req.params.id } });

        const categoryData = await Category.findAll();

        return res.status(200).json(categoryData);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
