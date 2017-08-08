Minimal example to highlight some issues with Appsee interfering with child React Native views. See
the following notes:

- When scrolling, the touchable button at the bottom is blocked. This is particularly worse when
  scrolling to the top or bottom of the list.
- When dragging the bottom bar, if the drag starts off too quickly, it will get stuck where it was
  a fraction of a second into the drag. React Native still reports the drag being held until the
  press is actually released, even if the drag is stuck. If the drag is started slowly, however,
  everything works as expected.
- Bugs above do NOT occur if Appsee is commented out, OR if it does not have a valid connection
  (i.e., leaving the Appsee API key to "test" or similar).

Other notes:

- Tested with one older and one current (2.3.3) SDK version of Appsee.
- Bugs occur both in simulator and on physical device.
- Bugs seem to occur across several different versions of Xcode, iOS, and React Native.
