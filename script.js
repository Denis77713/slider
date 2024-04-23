let sliderItems = document.querySelectorAll(".slide__item");
let popUp = document.querySelector(".pop-up");
const slider = document.querySelector(".slider");
const right = document.querySelector(".slider__img-right");
const left = document.querySelector(".slider__img-left");
let sliderArr = [];
let slidWidth = [];
sliderItems.forEach((width) => slidWidth.push(width.offsetWidth));
// console.log(slidWidth);
let sliderWidth = slidWidth[0];
let slidSum = 0;
for (let i = 1; i < slidWidth.length; i++) {
  slidSum += slidWidth[i];
}
// Удаляю изображения и записываю их в массив
for (let i = 0; i < sliderItems.length; i++) {
  sliderArr[i] = sliderItems[i];
  sliderItems[i].remove();
  sliderArr[i].id = i;
}
if (sliderArr.length == 1) {
  let newSlid = sliderArr[0].cloneNode(true)
  newSlid.id = 1
  // console.log(newSlid);
  sliderArr.push(newSlid)
  // console.log(sliderArr);
}
// popUp

for (let i = 0; i < sliderArr.length; i++) {
  let divPopUp = document.createElement("div");
  divPopUp.classList.add("pop-up__item");
  popUp.append(divPopUp);
}
// Подключаюсь к popUp
let popUpItem = document.querySelectorAll(".pop-up__item");
popUpItem[0].classList.add("pop-up__item_acrive");
//
sliderArr.forEach(function (slid, index) {
  slid.style.left = index * sliderWidth + "px";
  slider.appendChild(slid);
});
let q = 0;
let qw = 0;
right.addEventListener("click", function (e) {
  // Клик раз в секунду
  if(qw == sliderArr.length){
    qw=0
  }
  if (new Date().getTime() - this.lastClick < 600) return;
  this.lastClick = new Date().getTime();
  //  Основное событие
  popUpItem.forEach((div) => div.classList.remove("pop-up__item_acrive"));
  if (qw < sliderArr.length - 1) {
    qw++;
    popUpItem[qw].classList.add("pop-up__item_acrive");
    // console.log(qw);
  } else {
    qw = 0;
    popUpItem[qw].classList.add("pop-up__item_acrive");
  }
  // Интервал
  let interval = setInterval(function () {
    // Каждую секунду все слайды смещаются в сотрону
    sliderArr.forEach(
      (slid, index) => (slid.style.left = index * sliderWidth + q + "px")
    );
    q -= 4;
    if (sliderArr[0].style.left == -1 * sliderWidth + "px") {
      clearInterval(interval);
      sliderArr[0].remove();
      sliderArr.push(sliderArr.shift());
      slider.append(sliderArr[sliderArr.length - 1]);
      sliderArr[sliderArr.length - 1].style.left = slidSum + "px";
      // console.log(sliderArr);

      q = 0;
    }
  }, 1);
});
// console.log(sliderWidth);

qw = sliderArr.length;
left.addEventListener("click", function (e) {
  // Клик раз в секунду
  if (new Date().getTime() - this.lastClick < 600) return;
  this.lastClick = new Date().getTime();
  //  Основное событие popUp
  // console.log(qw + "qw");
  if (qw == 0) {
    popUpItem.forEach((div) => div.classList.remove("pop-up__item_acrive"));
    qw = sliderArr.length - 1;
    popUpItem[qw].classList.add("pop-up__item_acrive");
  } else {
    popUpItem.forEach((div) => div.classList.remove("pop-up__item_acrive"));
    qw--;
    popUpItem[qw].classList.add("pop-up__item_acrive");
  }
  // Основное событие
  sliderArr[sliderArr.length - 1].style.left = -1 * sliderWidth + "px";
  sliderArr[sliderArr.length - 1].style.left;
  sliderArr.forEach((q) => q);
  let interval2 = setInterval(function () {
    sliderArr.forEach(
      (q) => (q.style.left = Number(q.style.left.replace("px", "")) + 4 + "px")
    );
    if (sliderArr[sliderArr.length - 1].style.left == "0px") {
      clearInterval(interval2);
      sliderArr.unshift(sliderArr.pop());
      sliderArr.forEach((inp) => inp);
    }
  }, 1);
});
let arrLeft = [];
// console.log(sliderArr.length);
// Клик на popup
popUpItem.forEach((div) =>
  div.addEventListener("click", function (e) {
    if (new Date().getTime() - this.lastClick < (sliderArr.length - 1) * 1000)
      return;
    this.lastClick = new Date().getTime();

    sliderItems.forEach((q) => arrLeft.push(q.style.left));
    let indexPopUp;
    popUpItem.forEach((div) => div.classList.remove("pop-up__item_acrive"));
    e.target.classList.add("pop-up__item_acrive");
    for (let i = 0; i < popUpItem.length; i++) {
      if (popUpItem[i].classList.length == 2) {
        indexPopUp = i;
        qw = indexPopUp;
      }
    }
    let ideq;
    for (let i = 0; i < sliderArr.length; i++) {
      if (sliderArr[i].id == indexPopUp + "") {
        ideq = sliderArr[i];
      }
    }
    let interval3 = setInterval(function () {
      // Если left элемента массива № 5 например, меньшн 0
      // У всех left уменьшается на 10px в интервале
      if (ideq.style.left >= "0") {
        sliderArr.forEach(function (q) {
          q.style.left = Number(q.style.left.replace("px", "")) - 10 + "px";
        });
      } else {
        // стоп
        clearInterval(interval3);
        let filter = sliderArr.filter(function (q) {
          return Number(q.style.left.replace("px", "")) < -200;
        });

        for (let i = 0; i < filter.length; i++) {
          sliderArr.shift();
        }

        for (let i = 0; i < filter.length; i++) {
          sliderArr.push(filter[i]);
        }
        // отрисовка
        sliderItems.forEach((q) => q.remove());
        for (let i = 0; i < sliderArr.length; i++) {
          (sliderArr[i].style.left = i * sliderWidth + "px")
        }
        // sliderArr.forEach((q) => console.log(q));
        sliderArr.forEach((q) => slider.append(q));
      }
    }, 1);
  })
);
