[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# Icons

This package contains optimized SVG icons to be used on funda

Important: note that we use [semantic-release](https://github.com/semantic-release/semantic-release) and therefore any commits with the type "feat" or "fix" or have "BREAKING CHANGE" in the message will automatically release a new version to NPM.

### Optimisations using [svgo](https://github.com/svg/svgo):

- All default configuration from svgo are applied, including make everything inline;
- `role="img"` is added;
- Dimensions, i.e: `width` and `height` are removed

## Usage

    npm install @funda/icons

    import { thumbsDown } from "@funda/icons";

    /*{
        title: 'thumbs-down',
        svg: '<svg role="img" viewBox="0 0 24 24" ...'
    }*/

### Alternative

You might not want to use the icons directly into your JS application.
In that case the raw SVG icons are also available on the package, you just need to copy to you project.

    cp node_modules/@funda/icons/assets/* src/SPECIFY_YOUR_PATH

## Adding new icons

All icons should be designed following the [instructions found on Frontify](https://funda.frontify.com/d/d9gw4zTPqYFU/style-guide#/building-blocks/iconography). This way, all icons will appear as a family and will make sure an icon can be implemented easily.

### Using Illustrator

Most of our icons are designed in Illustrator. For these instructions I take the file with all icons as the reference. You can find this file in the shared UX folder. Designing and exporting icons using Illustrator is prefferd, since this will result in the properly aligned icons and optimized exports.

- Hide all unnecessary layers, like the Grid
- Go to File > Export > Export for Screens...
- Select 'SVG' as format and set a export location to your likings
- Give the icon a proper name in the left panel
- Click Export Artboard. The folder with the exported SVG appears automatically

### Using Sketch

If a icon is orginally designed in Sketch, you'll need to do some manual steps for a proper export. This is because exporting in Sketch works in a different way.

- Select the artboard of the icon you want to export, hide all unnecessary if needed.
- Make sure 'SVG' is selected as a preset in the right panel
- Export the icon with Export Selected... and select the location where you want to store te file
- After exporting, open de SVG file using your favorite code editor
- Remove the widht and height properties from the `<svg />` tag, but leave the viewbox property untouched

We have a precommit hook that will optimize the svg icons for usage.
