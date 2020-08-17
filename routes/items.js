const Router = require('express-promise-router');
// Sanitizer & Validator
const { check, validationResult } = require('express-validator');

const db = require('../db');
const middleware = require('../middleware');

const router = new Router();
router.use(middleware.checkLogin);

module.exports = router;

router.get('/', (req, res) => {
    res.render('item_form', {title: 'ITEM FORM'});
});

router.post('/',
    [
        check('name').exists().trim().escape(),
        check('image_link').isURL(),
    ],
    async (req, res) => {
        const data = [];
        data.push(req.session.user._id);
        data.push(req.body.name);
        data.push(req.body.image_link);

        const query = await db.query('INSERT INTO items(user_id,name,image_link) VALUES($1,$2,$3)',data);
        
        req.session.success = 'Item Added';
        res.redirect('/home');
    }
);

router.get('/:id([0-9]+)', async (req, res) => {
    const { rows } = await db.query(`SELECT * FROM items WHERE _id = $1`,[req.params.id]);

    if (rows.length > 0) {
        await db.query('UPDATE items SET hit=hit + 1, last_viewed_at=now() WHERE _id=$1',[req.params.id]); 
        res.render('item_detail', {title: rows[0].name+' DETAILS', data: rows[0]});
    } else {
        req.session.error = 'No Item Found'
        res.redirect('/home');
    }
});

router.post('/:id([0-9]+)/edit',
    [
        check('name').exists().trim().escape(),
    ],
    async (req, res) => {
        const data = [];
        data.push(req.body.name);
        data.push(req.body.image_link);
        data.push(req.params.id);

        const query = await db.query('UPDATE items SET name=$1, image_link=$2 WHERE _id=$3',data);
        
        req.session.success = 'Item Updated';
        res.redirect(`/${req.params.id}`);
    }
);

router.get('/delete/:id([0-9]+)', async (req, res) => {
    const sql = await db.query(`DELETE FROM items WHERE _id = $1`,[req.params.id]);

    req.session.success = 'Item Deleted';
    res.redirect('/home');
});

router.get('/filter/:filter([0-9]+)', async (req, res) => {
    let filter = req.params.filter;
    let query = '';
    
    if (filter == 1) {
        query = 'SELECT * FROM items ORDER BY last_viewed_at DESC';
    } else if (filter == 2) {
        query = 'SELECT * FROM items ORDER BY hit DESC';
    } else {
        query = 'SELECT * FROM items';
    }

    const { rows } = await db.query(query);

    res.json(rows);
});