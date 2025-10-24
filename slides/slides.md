---
theme: the-unnamed
title: Hacking Macropads with Scala Native
info: |
  ## Hacking Macropads with Scala Native

  [Michał Pawlik](https://michal.pawlik.dev)
drawings:
  persist: true
transition: none
mdc: true
background: /pexels-roller-coaster.jpg
themeConfig:
  # Base colors - warm cream palette
  color: "#2C3E50"                    # Dark blue-gray for main text
  background: "#FDF6E3"               # Warm cream background
  code-background: "#F5F0E8"          # Slightly darker cream for code blocks
  code-border: "#E8DCC6"              # Subtle border for code blocks

  # Accent colors - tech-inspired palette
  accents-teal: "#16A085"             # Emerald teal for highlights
  accents-yellow: "#F39C12"           # Warm orange-yellow for energy
  accents-red: "#E74C3C"              # Scala red for errors/warnings
  accents-lightblue: "#3498DB"        # Clear blue for info
  accents-blue: "#2980B9"             # Deeper blue for emphasis
  accents-vulcan: "#FDF6E3"           # Use cream instead of dark for contrast

  # Shadow and effects
  header-shadow: "rgba(44, 62, 80, 0.1) 1.95px 1.95px 2.6px"

  # Layout-specific configurations
  default-headingBg: "#E74C3C"        # Scala red headers
  default-headingColor: "#FFFFFF"     # White text on red headers
  default-background: "#FDF6E3"       # Cream background
  default-font-size: "1.1em"

  center-headingBg: "#2980B9"         # Deep blue for center layouts
  center-headingColor: "#FFFFFF"      # White text
  center-background: "#FDF6E3"        # Cream background
  center-font-size: "1.1em"

  cover-headingBg: "#16A085"          # Teal for cover page
  cover-headingColor: "#FFFFFF"       # White text
  cover-background: "#FDF6E3"         # Cream background
  cover-font-size: "1.1em"

  section-headingBg: "#3498DB"        # Light blue for sections
  section-headingColor: "#FFFFFF"     # White text
  section-background: "#FDF6E3"       # Cream background
  section-font-size: "1.1em"

  aboutme-background: "#F5F0E8"       # Slightly darker cream
  aboutme-color: "#2C3E50"            # Dark text
  aboutme-helloBg: "#E74C3C"          # Scala red for hello background
  aboutme-helloColor: "#FFFFFF"       # White text on red background
  aboutme-nameColor: "#E74C3C"        # Scala red for name
  aboutme-font-size: "1.1em"

  code-color: "#2C3E50"               # Dark text for readability
  code-font-size: "1.2em"
---

# Hacking Macropads with Scala Native

<!--
A macropad is a small programmable keyboard designed for custom shortcuts and controls, but it only becomes useful once properly programmed. When vendor software is untrustworthy or limited, getting it to work can be a real challenge. I’ll show you how Scala Native and fs2 provide a safe, flexible way to take full control of the device


Cool, now a short abstract. Here are the points I'll roughly go by: 
- I got a small present - macropad keyboard 
- First thought - sounds cool, I could do a bunch of stuff with it, maybe use as light dimmer for smarthome? 
- But it comes from an unknown source, so let's make sure its safe. I'll show pictures of how I dissasembled the hardware looking for suspicious electronic 
- Electronic looks clear, let's program it 
- The manufacturer only provides an exe and says I should give it antivirus exception 
- not gonna trust that 
- I've tried using oss alternative software, even forked some, but no joy supporting my particular device 
- Resolution: use ioctl to grab the device on Linux system level, exclusively consume the key events and bind them to some actions 
- I wrote a library and a program in Scala Native that utilizes both low level ioctl apis as well as fs2 for program design 
- Keypad can be programmed as I wanted 
- profit

-->

--- 
layout: cover
background: /macropads.png
---

# Macropads

--- 
layout: two-cols-header
---

# Macropad

::left::

<img class="w-60" alt="" src="./macropad-big.png" />

<img class="w-60" alt="" src="./macropad.png" />

::right::

- Automate tasks
- Look fancy
- No need to remember shortcuts


---

# Manufacturer configuration software

https://sikaicase.com/blogs/news/before-software-setting

<!-- Photo of user manual -->

---

# Smells like risk

Let's disassemble it and look for suspicious hardware

---

# Disassembly

<!-- Nothing sus -->

---

# Alternative software

### Community tooling alternatives

https://github.com/kriomant/ch57x-keyboard-tool

https://github.com/kamaaina/macropad_tool

https://github.com/rOzzy1987/MacroPad

https://www.reddit.com/r/MechanicalKeyboards/comments/17j27ic/i_wrote_a_new_app_for_chinese_macro_keypads/

<!-- including photo of supported keyboard -->

---

# Detect the macropad 

```
lsusb > /tmp/devices-before
lsusb > /tmp/devices-after
diff /tmp/devices-before /tmp/devices-after
```

---

# Detect the macropad


```
$ lsusb -d 514c:8851 -v  
Bus 003 Device 013: ID 514c:8851 c̪USB Keyboardȉ USB Keyboardȉ
...
```



---
layout: two-cols-header
class: "outro-slide"
---

# Thank you!

::left::

<img class="w-70" alt="" src="./michal_pawlik.jpg" />

::right::


<br/>

## Michał Pawlik

<logos-bluesky mt-2/> [@michal.pawlik.dev](https://bsky.app/profile/michal.pawlik.dev)<br/>
<grommet-icons-blog/> [blog.michal.pawlik.dev](https://blog.michal.pawlik.dev)
