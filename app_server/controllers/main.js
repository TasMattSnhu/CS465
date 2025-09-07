//Get Homepage

const index = (red, res) => {
    res.render('index', {title: "Travl Getaways"});
};

module.exports = {
    index
}