

# Use Query

Used for searching a param in url.returns **String**.

- Example

```
    const query = useQuery();
    const id = query.get("id");
```
- Returns
If url is ```example.com/page?id=3```, returns ```"3"```.