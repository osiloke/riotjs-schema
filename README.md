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
<!--schema-form schema={self.schema}/-->
<div name="content" action="Create"/>
<button type="submit">Create</button>
</form>
<script>

self.schema = {
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
self.schema_form = riot.mount(self.content, "schema-form", {parent: self, schema: schema})[0]
self.submit = () =>{ 
	console.log(JSON.stringify(self.schema_form.data))
}
</script>
</A-Form>
```