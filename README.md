# JS-Libs
Dom Libraries for js
- TableView
- CollectionView
- SegmentedView
```javascript
let tableView = new TableView("tableview");
tableView.setRowCount(10, (cell, index) => {
    cell.innerHTML = "this is row: " + index
    cell.style.backgroundColor = "red"
})
let collectionView = new CollectionView("collectionview", 200);
collectionView.setItemsCount(10, (cell, index) => {
    cell.innerHTML = "this is item: " + index
    cell.style.backgroundColor = "cyan"
})
window.onresize = function resize(event){
    collectionView.setWidth(document.body.offsetWidth / 100)
}
let segmentedview = new SegmentedView("segmentedview", [{text: "segmented1"}, {text: "segmented2"}], false)
```
