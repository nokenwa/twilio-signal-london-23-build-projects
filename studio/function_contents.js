let rand_nth = ss => ss[Math.floor(Math.random()*ss.length)];
let rand_date = () => new Date(new Date() - Math.random()*(1e+11)).toISOString();
let rand_btwn = (a,b) => Math.floor(Math.random() * (b-a)) + a;

let possible_names = [
  "Chloe Chipman",  "Sammy Sugarplum",  "Oscar Oatmeal", 
  "Ginger Snapson",  "Snickerdoodle Sarah", "Peanut Butter Paul",  
  "Daisy Doublechoc",  "Molly Molasses"]; // thanks ChatGPT

let possible_orders = [
  "2 Chocolate Chip, 1 Oatmeal Raisin, 3 Snickerdoodle.",
  "4 Double Chocolate, 2 Peanut Butter.",
  "1 Ginger Snap, 2 Shortbread, 3 Macaroon.",
  "5 Chocolate Chip, 2 Oatmeal Raisin, 2 Snickerdoodle.",
  "3 Double Chocolate, 4 Peanut Butter.",
  "2 Ginger Snap, 2 Shortbread, 1 Macaroon."
];

let randomCustomer = () => {
  return {name: rand_nth(possible_names),
          customer_since: rand_date(),
          loyalty_points: rand_btwn(100, 400),
          allergies: rand_nth(["Peanuts", "Tree Nuts (e.g., almonds, walnuts)", "Milk", "Soy", "Gluten", null, null, null]),
          total_spend_EUR: rand_btwn(5, 150)}}

let randomOrderData = () => {
  let open_orders_summary = Math.random() > 0.5 ? rand_nth(possible_orders) : "";
  let open_order_count = open_orders_summary.length > 0 ? 1 : 0;
  let order_history = []
  while (Math.random() > 0.5){
    order_history.push({order: rand_nth(possible_orders),
                        date: rand_date() 
  })}
  return {open_order_count, open_orders_summary, order_history}
}

exports.handler = function(context, event, callback) {

  // Note: the `From` passed in from studio is availaible in event.From - we don't use it here.

  let customer = randomCustomer();
  let orders = randomOrderData();

  let response = {customer, orders};

  return callback(null, response);
};

