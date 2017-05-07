Rainbow Chart VR
=========================

[This is a work-in-progress](https://bl.ocks.org/j3py/67bccc27426451b2ab17a882ada0d605)

Note: Github limits requests to their APIs and I don't have a reliable error alert in the VR context yet.


ToDo
------------

Currently this solution is not very useful.
Here are some things I need to do to correct that:
- Redo toggle button for color wave in VR (mostly done)
- Debug possible memory leak (might be done - removed unnecessary attaching of the same event listeners and reassigning of the same attributes)
- Increase error visibility by showing the API limit alert within the VR context.
- Allow movement (eg, forward, backward, side to side, etc)
- Floor plane should vary in size dynamically according to number of bars


The Project
------------

All the things:
- A-frame (JavaScript VR framework (wrapper for webVR DOM elements))
- D3js (JavaScript framework for data visualization)
- Various image assets for bl.ocks.org


Notes
-------------

I tried using Mirror.js to create a mirrored floor plane for even more awesome distraction.  So far it has failed and I removed the code.

There used to be a regular old html/css button that allowed the user to toggle the color wave on and off.  This is functional now as a VR button (clickable box), but it needs more styling.

After I added the tooltips, which are tied to the camera and cursor entities, basic movement like moving forward or backward went away.  I'll fix that eventually.