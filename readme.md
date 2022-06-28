This project aims to demonstrate the difference between client-side hydration of pre-rendered Stencil web components with a custom application bundle created with webpack and Stencil's `dist` bundle.

# Intall and prepare

As a first step install the projects dependencies.

```
npm install
```

# Reproduce

To reproduce the bug, I've created two scenarios of the same setup, one that uses Stencil's `dist` bundle and one that uses the custom `app` bundle on the client-side.

In order to run and access the two scenarios, run:

```
npm start
```

The `start` script will

1. execute a build of Stencil (`dist`, `dist-custom-elements`, `hydrate` and `www`)
2. builds the app with webpack importing components from `dist-custom-elements` distribution
3. pre-renders the html files within `./www` directory with the hydrate script
4. starts a local web server to serve `./www`

#### Pre-rendered HTML

Both, `./www/app.html` and `./www/index.html` contain a pre-rendered version of `my-component` that was created using the hydration script.

```html
<my-component class="sc-my-component-h hydrated" s-id="1">
  <!--r.1-->
  <!--o.0.1.-->
  <button class="sc-my-component sc-my-component-s" c-id="1.0.0.0">
    <!--s.1.1.1.0.-->
    <!--t.0.1-->
    This is the label
  </button>
</my-component>
```

After client-side hydration with Stencil's `dist` bundle, the html looks correct and is working as expected. The workflow can be reproduced on http://localhost:3000

```html
<my-component class="hydrated">
  <!-- #shadow-root (open) -->
  <button class="sc-my-component sc-my-component-s">
    <slot>
      <!-- ↳ #text reveal -->
    </slot>
  </button>
  <!---->
  This is the label
</my-component>
```

After client-side hydration with the custom `app` bundle, the html looks very different due to the slotted content not being hydrated correctly. The workflow can be reproduced on http://localhost:3000/app

```html
<my-component class="sc-my-component-h hydrated" s-id="1">
  <!-- #shadow-root (open) -->
  <button>
    <slot>
      <!-- ↳ <button> reveal -->
    </slot>
  </button>
  <!--r.1-->
  <!--o.0.1.-->
  <button class="sc-my-component sc-my-component-s" c-id="1.0.0.0">
    <!--s.1.1.1.0.-->
    <!--t.0.1-->
    This is the label
  </button>
</my-component>
```
