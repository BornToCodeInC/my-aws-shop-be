(()=>{var t={3:t=>{t.exports={swagger:"2.0",info:{title:"product-service",version:"1"},paths:{"/products/{id}":{get:{summary:"getProductById",description:"",operationId:"getProductById.get.products/{id}",consumes:["application/json"],produces:["application/json"],parameters:[{name:"id",in:"path",required:!0,type:"string"}],responses:{200:{description:"successful API Response",schema:{$ref:"#/definitions/Product"}}}}},"/products":{get:{summary:"getProductList",description:"",operationId:"getProductList.get.products",consumes:["application/json"],produces:["application/json"],parameters:[],responses:{200:{description:"successful API Response",schema:{$ref:"#/definitions/Products"}}}}}},definitions:{Product:{properties:{id:{title:"Product.id",type:"string"},title:{title:"Product.title",type:"string"},price:{title:"Product.price",type:"number"},description:{title:"Product.description",type:"string"},category:{title:"Product.category",type:"string"},image:{title:"Product.image",type:"string"},rating:{$ref:"#/definitions/Rating",title:"Product.rating"}},required:["id","title","price","description","category","image","rating"],additionalProperties:!1,title:"Product",type:"object"},Products:{items:{$ref:"#/definitions/Product",title:"Products.[]"},title:"Products.[]",type:"array"},Rating:{properties:{rate:{title:"Rating.rate",type:"number"},count:{title:"Rating.count",type:"number"}},required:["rate","count"],additionalProperties:!1,title:"Rating",type:"object"}},securityDefinitions:{}}}},e={};function __webpack_require__(r){var i=e[r];if(void 0!==i)return i.exports;var o=e[r]={exports:{}};return t[r](o,o.exports,__webpack_require__),o.exports}var r={};(()=>{"use strict";var t=r;const e=__webpack_require__(3);t.handler=async()=>({statusCode:200,body:JSON.stringify(e)})})();var i=exports;for(var o in r)i[o]=r[o];r.__esModule&&Object.defineProperty(i,"__esModule",{value:!0})})();
//# sourceMappingURL=swagger-json.js.map