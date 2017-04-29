Rainbow Chart VR
=========================

This is a work-in-progress


ToDo
------------

Currently this solution is not very useful.
Here are some things I need to do to correct that:
- Make bar height and actual data value accurate
- Correct tool tip location when in VR mode
- Debug possible memory leak
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

You may have noticed that the bar heights seem inversely proportional to the actual values...  haven't looked into that bug yet, but it's high on my priority list.

The tool tip doesn't appear in the proper location when in VR mode.

Sometimes when I leave browser tab open for a while and come back to it I find it has froze and takes a few seconds to start working again...  I haven't looked into it yet, but it's second on my priority list.

After I added the tooltips, which are tied to the camera and cursor entities, basic movement like moving forward or backward went away.  I'll fix that eventually.