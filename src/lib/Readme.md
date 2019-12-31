### Invoice Table

InvoiceTable example:

```js
import React from "react";
const theDummyPartsList = [
  { pn: "11100KFN900S", nm: "CRANK CASE COMP. R.", rs: 3639, qty: 100 },
  { pn: "11100KFN970S", nm: "CRANK CASE CMP RIGHT", rs: 3639, qty: 100 },
  { pn: "11100KFNH00S", nm: "CRANK CASE COMP. R.", rs: 3639, qty: 100 },
  { pn: "11100KFNH70S", nm: "CRANK CASE CMP RIGHT", rs: 3639, qty: 100 },
  { pn: "11100KRC921S", nm: "CRANKCASE COMP. RIGHT", rs: 2909, qty: 100 },
  { pn: "11100KRY900S", nm: "CRANK CASE COMP.RIGHT", rs: 4011, qty: 100 },
  { pn: "11100KRY960S", nm: "CRANK CASE COMP. RIGHT", rs: 4011, qty: 100 },
  { pn: "11100KRY970S", nm: "CRANK CASE COMP. RIGHT", rs: 4011, qty: 100 },
  { pn: "11100KSP900HS", nm: "CRANK CASE COMP.RIGHT", rs: 2006, qty: 100 },
  { pn: "11100KSP900S", nm: "CRANK CASE COMP.RIGHT", rs: 2006, qty: 100 },
  { pn: "11100KSP910HS", nm: "CRANK CASE COMP.RIGHT", rs: 2006, qty: 100 },
  { pn: "11100KSP910S", nm: "CRANK CASE COMP.RIGHT", rs: 2006, qty: 100 },
  { pn: "11100KTC921S", nm: "CRANK CASE COMP.RIGHT", rs: 2137, qty: 100 },
  { pn: "11100KTCA00HS", nm: "CRANK CASE COMP RIGHT(CSM)", rs: 2720, qty: 100 },
  { pn: "11100KTCA00S", nm: "CRANK CASE COMP RIGHT(CSM)", rs: 2720, qty: 100 },
  { pn: "11100KTCA20S", nm: "CRANK CASE COMP,RIGHT", rs: 1801, qty: 100 },
  { pn: "11100KTP900S", nm: "CRANK CASE COMP. RIGHT", rs: 1880, qty: 100 },
  { pn: "11100KTR920S", nm: "CRANK CASE COMP RIGHT", rs: 2242, qty: 100 },
  { pn: "11100KTR940S", nm: "CRANK CASE COMP.RIGHT", rs: 2242, qty: 100 },
  { pn: "11100KVE900S", nm: "CRANK CASE COMP. R", rs: 2278, qty: 100 }
];
const taxSlabList = [
  { id: "jgfHLmfQWFlpUbL6IJTo", gid: "GST 5 %", cs: "1", tx: "5" },
  { id: "jgfHLmfQWFlpUbL6IJT0", gid: "GST 18 %", cs: "1", tx: "18" },
  { id: "jgfHLmfQWFlpUbL6IJT1", gid: "GST 28 %", cs: "1", tx: "28" }
];

const theItemList = [
  // {pn:'213',nm:'Name 1', rs: 12, qty: 10, disc:10, tax: 'jgfHLmfQWFlpUbL6IJT0'}
];
const [items, setItems] = React.useState(theItemList);
const [items2, setItems2] = React.useState(theItemList);
const [items3, setItems3] = React.useState(theItemList);
const [searchResults, setSearchResults] = React.useState([1, 2, 3, 4, 5]);
const tableColumns1 = [
  {
    title: "Part No",
    field: "pn",
    editable: true,
    searchable: true,
    required: true
  },
  { title: "Part Name", field: "nm", editable: true, required: true },
  {
    title: "Unit Price",
    field: "rs",
    editable: true,
    default: 0,
    required: true
  },
  {
    title: "Tax Group",
    field: "tax",
    editable: true,
    type: "select",
    options: taxSlabList,
    optionId: "gid",
    required: true
  },
  {
    title: "Quantity",
    field: "c",
    editable: true,
    default: 1,
    style: { width: "56px" },
    type: "number",
    required: true
  },
  {
    title: "Disc",
    field: "disc",
    editable: true,
    default: 0,
    style: { width: "56px" },
    type: "number",
    suffix: "%"
  },
  {
    title: "Price",
    field: "price",
    type: "numeric",
    calc: "roundTo(rs*c*(1-(.01*disc)),2)"
  }
];

const tableColumns2 = [
  {
    title: "Part No",
    field: "pn",
    editable: true,
    searchable: true,
    required: true
  },
  { title: "Part Name", field: "nm" },
  { title: "Sales Price", field: "rs", default: 0, required: true },
  {
    title: "Tax Group",
    field: "tax",
    editable: false,
    type: "select",
    options: taxSlabList,
    optionId: "gid",
    required: true
  },
  {
    title: "Quantity",
    field: "qty",
    editable: true,
    default: 1,
    required: true
  },
  {
    title: "Discount here",
    field: "disc",
    editable: true,
    style: { width: "56px" },
    type: "number",
    suffix: "%",
    default: 0
  },
  {
    title: "Price",
    field: "price",
    type: "numeric",
    calc: "roundTo(rs*qty*(1-(.01*disc)),2)"
  }
];

const tableColumns3 = [
  {
    title: "Part No 3",
    field: "pn",
    editable: true,
    searchable: true,
    required: true
  },
  { title: "Part Name", field: "nm", required: true },
  { title: "Unit Price", field: "rs", default: 0, required: true },
  {
    title: "Tax Group",
    field: "tax",
    editable: true,
    type: "select",
    options: taxSlabList,
    optionId: "gid",
    required: true
  },
  {
    title: "Quantity",
    field: "qty",
    editable: true,
    default: 1,
    style: { width: "56px" },
    type: "number",
    required: true
  },
  {
    title: "Disc",
    field: "disc",
    editable: true,
    default: 0,
    style: { width: "56px" },
    type: "number",
    suffix: "%"
  },
  {
    title: "Price",
    field: "price",
    type: "numeric",
    calc: "roundTo(rs*qty*(1-(.01*disc)),2)"
  }
];

function handleSearch(value) {
  // console.log("value is ",value);
  const resList = theDummyPartsList.filter(aPart => aPart.pn.includes(value));
  // console.log("resList is ",resList);
  setSearchResults(resList);
}
const table1 = (
  <InvoiceTable
    tableColumns={tableColumns1}
    tableData={items}
    searchResults={searchResults}
    setTableData={setItems}
    handleSearch={handleSearch}
    isEditable={true}
  />
);
const table2 = (
  <InvoiceTable
    tableColumns={tableColumns2}
    tableData={items2}
    searchResults={searchResults}
    setTableData={setItems2}
    handleSearch={handleSearch}
    isEditable={true}
  />
);
const table3 = (
  <InvoiceTable
    tableColumns={tableColumns3}
    tableData={items3}
    searchResults={searchResults}
    setTableData={setItems3}
    handleSearch={handleSearch}
    isEditable={true}
  />
);
<React.Fragment>
  <div>
    <div>
      <h1>Next Table 1</h1>
    </div>
    <div>{table1}</div>
    <div>
      <h1>Next Table 2</h1>
    </div>
    <div>{table2}</div>
    <div>
      <h1>Next Table 3</h1>
    </div>
    <div>{table3}</div>
  </div>
</React.Fragment>;
```
