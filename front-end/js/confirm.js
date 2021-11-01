document.addEventListener("DOMContentLoaded", function () {
  const orderInfo = JSON.parse(localStorage.getItem("order"));
  console.log(orderInfo);
  document.getElementById("usercmd").innerHTML =
    orderInfo.firstName + " " + orderInfo.lastName;
  document.getElementById("numerocmd").textContent = orderInfo.orderId;
  document.getElementById("pricecmd").textContent = orderInfo.totalPrice;
  localStorage.removeItem("cart");
  localStorage.removeItem("order");
});
