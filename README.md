# Description of errors

Minimal example to highlight some issues with Appsee interfering with child React Native views. See
the following notes:

* When scrolling, the touchable button at the bottom is blocked during the scroll and shortly
  afterwards, until at least two presses are made onto the touchable button after the scroll animation
  has fully completed. The scrolling when Appsee is enabled therefore has the functional side effect
  of making any other React Native touchables seem unresponsive for the first subsequent press.
  Blocking during the scrolling seems particularly worse when scrolling to the top or bottom of the
  list, or when trying to press during a scroll event with significant motion still occurring.
* When dragging the bottom bar, if the drag starts off too quickly, it will get stuck where it was
  a fraction of a second into the drag. React Native still reports the drag being held until the
  press is actually released, even if the drag is stuck. If the drag is started slowly, however,
  everything works as expected.
* Bugs above do NOT occur if Appsee is not present in the project, if Appsee is commented out, OR
  if it does not have a valid connection (i.e., leaving the Appsee API key to "test" or similar).
* **Note that these errors seem to only occur if Appsee is installed and launched via Xcode/ObjC, either manually as
  a framework or via Pods. Errors seem to not be present when Appsee is installed and launched entirely via
  React Native/npm/JS.** (See branch [`install-appsee-via-react-native-npm`](https://github.com/abrahambotros/appsee-embedded-rn-issues/tree/install-appsee-via-rn-npm)
  for installation via React Native/npm/JS.)

# Steps to recreate

1. `npm install`
2. `pod install` - note that this installs specifically the latest version of Appsee via Pods.
3. In `AppDelegate.m`, insert a valid Appsee key.
    1. Alternatively, comment out the Appsee setup to test the default case with no Appsee, which has no errors.
    2. Note that setting the Appsee key to "test" or an empty string will actually lead to none of the errors described occurring, which further points to a functional Appsee runtime being the culprit.
4. Run.
5. Scroll/fling the scrollable items around, and try to press the blue "Press" button.
    1. Note that when Appsee is on, pressing the button is blocked until after the scrollable items have stopped scrolling and an additional wasted press is already made.
    2. Note that when Appsee is off, there are no such errors.
6. Drag the bottom red area around.
    1. Note that when Appsee is on and the drag starts fairly quickly, the drag freezes erroneously.
    2. Note that when Appsee is off, the drag moves with the press as expected, with no errors.

# Other notes

* Tested with Appsee SDK versions 2.3.2, 2.3.3, and 2.3.4.
* Bugs occur both in simulator and on physical device.
* Bugs seem to occur across several different versions of Xcode, iOS, and React Native.
