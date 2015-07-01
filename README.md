Riot Schema

Minimal json schema form renderer for riot.
Currently uses muicss for styling and material design.

Simple usage

```
//Currently you can only use muicss components 

import 'riot-schema/components/muicss-form';
import riot from 'riot';

<A-Form>
<form onsubmit={submit}>
<div name="content" action="Create"/>
<button type="submit">Create</button>
</form>
<script>

let schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "hello",
  "type": "object",
  "title": "Hello Text",
  "description": "This is just a hello form",
  "name": "/",
  "properties": {
    "hello": {
      "id": "hello",
      "type": "string",
      "title": "Hello",
      "description": "Enter a name",
      "name": "hello"
    }
  },
  "required": [
    "hello"
  ]
}
let self = this
riot.mount(self.content, "schema-form", {parent: self, schema: schema})
self.submit = () =>{ 
	console.log(JSON.stringify(self.content.data))
}
</script>
</A-Form>
```