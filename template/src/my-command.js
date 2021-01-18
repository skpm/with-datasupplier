const sketch = require('sketch')
const { DataSupplier } = sketch
const util = require('util')

export function onStartup () {
  // To register the plugin, uncomment the relevant type:
  DataSupplier.registerDataSupplier('public.text', '{{ name }}', 'SupplyData')
  // DataSupplier.registerDataSupplier('public.image', '{{ name }}', 'SupplyData')
  // DataSupplier.registerDataSupplier('public.json', '{{ name }}', 'SupplyData') // Available in Sketch 71+
}

export function onShutdown () {
  // Deregister the plugin
  DataSupplier.deregisterDataSuppliers()
}

export function onSupplyData (context) {
  let dataKey = context.data.key
  const items = util.toArray(context.data.items).map(sketch.fromNative)
  items.forEach((item, index) => {
    let data = Math.random().toString()
    // For `public.image`, `data` must be a path to an image
    // let data = 'path/to/image'
    // For `public.json`, `data` must be a JSON object with layer names for keys, and content for values
    // let data = {
    //   "name": "John",
    //   "surname": "Doe",
    //   "email": "developer@sketch.com"
    // }
    // Check the docs for more info: https://developer.sketch.com/reference/api/#data-supplier
    DataSupplier.supplyDataAtIndex(dataKey, data, index)
  })
}
