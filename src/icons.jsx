import logo_white from "./icon/logo_white.svg";
import logo_block from "./icon/logo_block.svg";
import instagram from "./icon/instagram-brands.svg";
import facebook from "./icon/facebook-square-brands.svg";
import tel from "./icon/phone-alt-solid.svg";
import mail from "./icon/envelope-solid.svg";
import address from "./icon/home-solid.svg";
import house from "./icon/home-solid.svg";
import success from "./icon/tick-inside-circle.svg";
import wifi from "./icon/wifi.svg";
import tv from "./icon/television.svg";
import view from "./icon/mountain-range.svg";
import meal from "./icon/breakfast.svg";
import air from "./icon/breeze.svg";
import nosmoking from "./icon/no-smoke-symbol.svg";
import bar from "./icon/bar.svg";
import fridge from "./icon/fridge.svg";
import baby from "./icon/crawling-baby-silhouette.svg";
import roomService from "./icon/room_service.svg";
import sofa from "./icon/sofa.svg";
import pet from "./icon/dog.svg";

const imgSet = {
  logo_white: logo_white,
  logo_block: logo_block,
  instagram: instagram,
  facebook: facebook,
  tel: tel,
  mail: mail,
  address: address,
  house: house,
  success: success,
};
const facilityIcon = {
  "Wi-Fi": { url: wifi, name: "Wi-Fi" },
  Television: { url: tv, name: "電話" },
  "Great-View": { url: view, name: "漂亮的視野" },
  Breakfast: { url: meal, name: "早餐" },
  "Air-Conditioner": { url: air, name: "空調" },
  "Smoke-Free": { url: nosmoking, name: "禁止吸菸" },
  "Mini-Bar": { url: bar, name: "Mini-Bar" },
  Refrigerator: { url: fridge, name: "冰箱" },
  "Child-Friendly": { url: baby, name: "適合兒童" },
  "Room-Service": { url: roomService, name: "Room Service" },
  Sofa: { url: sofa, name: "沙發" },
  "Pet-Friendly": { url: pet, name: "寵物攜帶" },
};
export { facilityIcon };

const imageUrl = Object.freeze(imgSet);
export { imageUrl };
