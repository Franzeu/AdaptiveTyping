const test_res = async  (req, res, next) => {

    try{
        res.send('backend test successful');
    }

    catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {

    test_res
}