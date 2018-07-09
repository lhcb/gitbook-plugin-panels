
# Panels

This adds Bootstrap panels, Software Carpentry style, to GitBook.

## The styles:

| Command                    | Style     | Icon             | Hidden |
|----------------------------|-----------|------------------|--------|
| `{% panel "title" %}`      | `default` | null             | false |
| `{% prereq "title" %}`     | `warning` | `rocket`         | false |
| `{% callout "title" %}`    | `primary` | `info-circle`    | false |
| `{% challenge "title" %}`  | `success` | `square-o`       | false |
| `{% solution "title" %}`   | `danger`  | `check-square-o` | true  |
| `{% objectives "title" %}` | `warning` | `line-chart`     | false |
| `{% keypoints "title" %}`  | `success` | `key`            | false |
| `{% discussion "title" %}` | `info`    | `bell`           | true  |

The `solution` block can be nested inside the `challenge` block, but in that case,
you should not include `{% endsolution %}` (that's just how nested GitBook blocks work).
Nested solution blocks use a `line-chart` icon by default.

## The options:

* `style`: One of `default`, `primary`, `success`, `info`, `warning`, or `danger`
* `icon`: A Font Awesome icon
* `hidden`: Starts collapsed if true

## Example:

```
{% callout "My Callout Title", hidden=true %}
This callout starts collapsed.
{% endcallout %}
```

