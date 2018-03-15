import {viewRoute, routeName} from "./apps";

export default [
  viewRoute({
    name: "Base",
    path: "product",
    meta: {right: "all", link: true, verboseName: "base"},
    redirect: {name: routeName("ProductList")},
    children: [
      // attribute
      viewRoute({
        name: "AttributeList", path: "attribute",
        meta: {right: "all", link: true, verboseName: "attribute list"},
      }),
      viewRoute({
        name: "AttributeCreate", path: "attribute/create",
        meta: {right: "all", link: true, verboseName: "attribute create"},
      }),
      viewRoute({
        name: "AttributeForm", path: "attribute/:id", props: true,
        meta: {right: "all", link: true, verboseName: "attribute form"},
      }),

      // product category
      viewRoute({
        name: "ProductCategoryList", path: "product-category",
        meta: {right: "all", link: true, verboseName: "product category list"},
      }),
      viewRoute({
        name: "ProductCategoryCreate", path: "product-category/create",
        meta: {right: "all", link: true, verboseName: "product category create"},
      }),
      viewRoute({
        name: "ProductCategoryForm", path: "product-category/:id", props: true,
        meta: {right: "all", link: true, verboseName: "product category form"},
      }),

      // uom
      viewRoute({
        name: "UOMList", path: "uom",
        meta: {right: "all", link: true, verboseName: "uom list"},
      }),
      viewRoute({
        name: "UOMCreate", path: "uom/create",
        meta: {right: "all", link: true, verboseName: "uom create"},
      }),
      viewRoute({
        name: "UOMForm", path: "uom/:id", props: true,
        meta: {right: "all", link: true, verboseName: "uom form"},
      }),

      // product template
      viewRoute({
        name: "ProductTemplateList", path: "product-template",
        meta: {right: "all", link: true, verboseName: "product template list"},
      }),
      viewRoute({
        name: "ProductTemplateCreate", path: "product-template/create",
        meta: {right: "all", link: true, verboseName: "product template create"},
      }),
      viewRoute({
        name: "ProductTemplateForm", path: "product-template/:id", props: true,
        meta: {right: "all", link: true, verboseName: "product template form"},
      }),

      // product
      viewRoute({
        name: "ProductList", path: "product",
        meta: {right: "all", link: true, verboseName: "product list"},
      }),
      viewRoute({
        name: "ProductCreate", path: "product/create",
        meta: {right: "all", link: true, verboseName: "product create"},
      }),
    ]
  })
]
