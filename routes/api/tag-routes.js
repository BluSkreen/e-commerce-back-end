const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
        const tagData = await Tag.findAll({ include: [ Product ] });

        if (!tagData) {
            return res.status(404).json("no tags found!");
        }

        return res.status(200).json(tagData);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [ Product ],
        });

        if (!tagData) {
            return res.status(404).json({ message: "id not found!" });
        }

        return res.status(200).json(tagData);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    // create a new tag
    try {
        const tagData = await Tag.create(req.body);
        
        return res.status(200).json(tagData);
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    // update a tag's name by its `id` value
    try {
        const tagData = Tag.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!tagData) {
            return res.status(404).json({ message: "id not found!" });
        }
        return res.status(200).json({ message: "tag updated" });
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    // delete a tag by its `id` value
    try {
        await Tag.destroy({ where: { id: req.params.id } });

        const tagData = await Tag.findAll();

        return res.status(200).json(tagData);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;
