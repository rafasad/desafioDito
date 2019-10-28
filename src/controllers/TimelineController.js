const eventJson = require('../../dito-event.json')

module.exports = {

    async index(req, res) {        
        const timeline = await organizeTimeline(eventJson);
        return res.send({ timeline });
    }
};

function organizeTimeline(json) {
    let { events } = json;
    let products = [];
    let timeline = [];
    for (const event of events) {
        if (event.event == "comprou-produto") {
            products.push(Product(event));
        } else if (event.event == "comprou") {
            timeline.push(TimelineItem(event));
        }
    }

    timeline.forEach(time => {
        time.products = products.filter(prod => {
            return time.transaction_id === prod.transaction_id;
        }).map(({ name, price }) => ({ name, price }));
    });
    

    return timeline.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

function TimelineItem(event) {
    let timelineItem = {};
    timelineItem.timestamp = event.timestamp;
    timelineItem.revenue = event.revenue;
    event.custom_data.forEach(e => {
        if (e.key == "transaction_id") {
            timelineItem.transaction_id = e.value;
        }
        else if (e.key == "store_name") {
            timelineItem.store_name = e.value;
        }
    });
    return timelineItem;
}

function Product(event) {
    let product = {};
    event.custom_data.forEach(eve => {
        if (eve.key == "transaction_id") {
            product.transaction_id = eve.value;
        }
        else if (eve.key == "product_name") {
            product.name = eve.value;
        }
        else if (eve.key == "product_price") {
            product.price = eve.value;
        }
    });
    return product;
}