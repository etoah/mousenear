
## mousenear

Detect when the mouse is near/on an element.

### Usage

```javascript
import MouseNear from 'mousenear';

var mouseNear = new MouseNear({
  distance: 40, //default 40
  //offsetY: default distance
  //offsetX: default distance
  //persistent: default false
  //throttleTime: default 100ms
})

mouseNear.add(docment.querySelector('.element-1'), () => {
    document.querySelector('.element-1').classList.add('active');
});

mouseNear.remove(docment.querySelector('.element-1')) //remove lisenter

mouseNear.destory()
```