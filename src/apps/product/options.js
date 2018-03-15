const ROUND_METHODS = [
  {value: "ROUND_CEILING", label: "round ceiling"},  // 趋向无穷取整
  {value: "ROUND_DOWN", label: "round down"},  // 趋向0取整
  {value: "ROUND_FLOOR", label: "round floor"},  // 趋向负无穷取整
  {value: "ROUND_HALF_DOWN", label: "round half down"},  // 末位大于五反向零取整,否则趋向零取整
  {value: "ROUND_HALF_EVEN", label: "round half even"},  // 末位大于五反向零取整,小于五趋向零取整,遇五前位为奇数反向零取整
  {value: "ROUND_HALF_UP", label: "round half up"},  // 末位大于等于五反向零取整,否则趋向零取整
  {value: "ROUND_UP", label: "round up"},  // 反向0取整
  {value: "ROUND_05UP", label: "round zero and half up"}  // 取整位数为零或五时反向零取整,否则趋向零取整
];

const CATEGORIES = [
  {value: "m", label: "meter"},
{value: "kg", label: "kilogram"},
{value: "s", label: "second"},
{value: "A", label: "Ampere"},
{value: "K", label: "Kelvins"},
{value: "J", label: "Joule"},
{value: "m2", label: "square meter"},
{value: "m3", label: "cubic meter"},
{value: "unit", label: "unit"},
{value: "yuan", label: "yuan"}
];

const STOCK_TYPIES = [
  {value: "service", label: "service"},
  {value: "digital", label: "digital"},
  {value: "stock-expiration", label: "stock expiration"},
  {value: "stock-no-expiration", label: "stock not expiration"},
  {value: "consumable", label: "consumable product"}
];

export {
  ROUND_METHODS,
  CATEGORIES,
  STOCK_TYPIES
}
