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
background: /background.jpg
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

<link href='https://tools-static.wmflabs.org/fontcdn/css?family=Black+Han+Sans' rel='stylesheet' type='text/css'>

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

<!-- Background slide before entering the stage -->

---
layout: cover
background: /macropads.png
---

# Macropads

<!-- 

Who knows what a macropad is? show of hands ✋

Recently I got gifted with a macropad, I wanted to see if I can make use of it

 -->

---
layout: two-cols-header
---

# Why use Macropad

::left::

<img class="w-60" alt="" src="./macropad-big.png" />

<img class="w-60" alt="" src="./macropad.png" />

::right::

<v-clicks>

- Look fancy
- Automate tasks
- No need to remember shortcuts

</v-clicks>

---
layout: two-cols-header
---

# Workflow

::left::

<v-clicks>

1. Connect the device
2. Use provided software to assign keypress sequence to buttons (e.g. first key sends `CTR+ALT+DEL`)
3. Configure your OS to perform certain actions upon key sequence

</v-clicks>

::right::

<img class="w-80" alt="" src="./macropad.png" />

---
layout: two-cols-header
---

# Manufacturer configuration software

<!-- https://sikaicase.com/blogs/news/before-software-setting -->

::left::

<img class="h-80" alt="" src="./user-manual-front.jpg" />

::right::

<img class="w-90" alt="" src="./user-manual-download.jpg" />

<!-- 

For manufacturer software you typically need to look into the manual

Mine was in chinese

I usually don't read them, but since this one contained a link and a QR code I **became extra suspicious**

 -->

---

# Security warning 😎

<img alt="" src="./software-zoom.png" />

<!-- For the right reasons! -->

---
layout: cover
background: /suspicious.jpg
---

# Sus

Let's disassemble this thing

<!-- so I decided I need to make sure it's safe -->

---
layout: two-cols-header
---

# Disassembly

::left::

<img class="h-100" alt="" src="./macropad-dissassembly-1.jpg" />

::right::

<img class="w-150" alt="" src="./macropad-dissassembly-2.jpg" />


<v-click>

**looks fine I guess**

</v-click>

<!-- 
I don't see anything obviously suspicious. Everything appears consistent with a standard USB macropad:

- Poor rotary encoder (knob) soldering to the left
- USB-C connector for data/power
- Microcontroller and support ICs
- Three mechanical key switches
- Standard passive components (resistors, capacitors)

Upon connection it reports single HID device, in an isolated environment I've found no suspicious traffic from/to device
 -->

---
background: /nothing-to-see.jpg
---

---
layout: center
---

# Alternative software

---
layout: two-cols-header
---

::left::

# Alternative software

Community tooling alternatives

* https://www.reddit.com/r/MechanicalKeyboards/comments/17j27ic/i_wrote_a_new_app_for_chinese_macro_keypads/
* https://github.com/kriomant/ch57x-keyboard-tool
* https://github.com/kamaaina/macropad_tool
* https://github.com/rOzzy1987/MacroPad

::right::
<img class="h-120" alt="" src="./reddit-thread.png" />

<!-- 

There is a handful of alternatives and reddit threads about the issue
 -->

---
layout: center
---

# Let's try it! 🧐

---

# Me trying to use community alternatives

<img class="h-100" alt="" src="./family-guy.gif" />

<!-- 

That's the **real life recording** of my attempting to use software from those threads

Numerous issues, but the biggest issue was the fact that particular keyboard can come with various device-id & vendor-id, meaning that programming it needs different set of commands sent to the device.

- Identically looking keyboards report as totally different vendor-id/product-id
- Even after forking and adjusting the software to support ids of my keyboard, the commands for programming the macropad were different
- I would have to run and reverse-engineer the provided software to first find the right commands, then reproduce that comms in my program (or the forked project)

This breaks the rule of not using the sus software though

 -->

---
layout: center
---

# Different approach

---
layout: two-cols-header
---

# Different approach

::left::

<img class="w-100" alt="" src="./what-if-i-told-you.jpg" />

::right::

- Mapping the keys was never necessary
<v-clicks>

- We could just have a program that reacts directly to the keyboard input events
- And make the system ignore the input everywhere else outside our program

</v-clicks>


---

# Meet `EVIOCGRAB`!

From the Linux Input Subsystem

> input handle that currently has the device grabbed (via **EVIOCGRAB** ioctl). <br/> When a handle grabs a device it **becomes sole recipient** for all input events coming from the device


Source: https://www.kernel.org/doc/html/latest/driver-api/input.html

<!-- 

Linux Input Subsystem allows you (your program) to become the exclusive recipient of input data from a device via **EVIOCGRAB**
 -->

---
layout: center
---

# Let's see the docs

---
layout: two-cols-header
---

# The docs

::left::

<img class="w-100" alt="" src="/EVIOCGRAB-docs-1.png" />

::right::

<v-clicks>

<img class="w-180" alt="" src="/EVIOCGRAB-docs-2.png" />

<img class="w-180" alt="" src="/EVIOCGRAB-docs-3.png" />

</v-clicks>


<!-- Now that's a niche feature -->

---

# Grabbing device with `ioctl`

```c {7-9}{lines:true}
#include <fcntl.h>
#include <unistd.h>
#include <linux/input.h>
#include <sys/ioctl.h>

int main() {
  int fd = open("/dev/input/event0", O_RDONLY);
  int grab = 1;
  ioctl(fd, EVIOCGRAB, &grab);
  // close and return 0
}
```

<v-clicks>

* `fd` is the file descriptor
* `EVIOCGRAB` is a predefined kernel constant
* `&grab` means we are passing the address of value `1` allocated on stack

</v-clicks>

<v-click>

Let's try to use it

</v-click>

<!-- 

Here's an snippet showing how to use EVIOCGRAB in C

We'll shortly write the same in Scala

 -->


---

# Find the right file 🕵️

First we need to find the device ID 

```diff {1|2|3|*}
$ lsusb > /tmp/devices-before # run this before plugging in the keyboard
$ lsusb > /tmp/devices-after  # run when keyboard has been plugged
$ diff /tmp/devices-before /tmp/devices-after
20a21
> Bus 003 Device 013: ID 514c:8851 c̪USB Keyboardȉ USB Keyboardȉ
```

<v-click>

**Found it!**

Allow me to introduce

</v-click>

<!-- 

It has presented itself as...

 -->

---
background: /bond.jpg
---

<div class="absolute top-30 right-8 text-right text-5xl">
  They call me Keyboardȉ
</div>

<v-click>

<div class="absolute bottom-60 right-8 text-right text-3xl">
  c̪USB Keyboardȉ USB Keyboardȉ
</div>

</v-click>

---

# Detect the macropad

```bash {1,2,11,12}{lines:false}
$ lsusb -d 514c:8851 -v
Bus 003 Device 016: ID 514c:8851 c̪USB Keyboardȉ USB Keyboardȉ
Device Descriptor:
  bLength                18
  bDescriptorType         1
  bcdUSB               1.10
  bDeviceClass            0 [unknown]
  bDeviceSubClass         0 [unknown]
  bDeviceProtocol         0
  bMaxPacketSize0        64
  idVendor           0x514c c̪USB Keyboardȉ
  idProduct          0x8851 USB Keyboardȉ
  bcdDevice            1.00
  iManufacturer           1 c̪USB Keyboardȉ
  iProduct                2 USB Keyboardȉ
  iSerial                 3 433132303333372E
  bNumConfigurations      1
  Configuration Descriptor:
    bLength                 9
    bDescriptorType         2
    wTotalLength       0x0042
```

<!-- They will help us find the file to read form -->

---

# Detect the input device

<!-- The /dev/input directory in Linux contains device files for various input devices like keyboards, mice, and joysticks, allowing the system to interact with these peripherals  -->

Now let's find the file that represents the input events




<!-- 
Or if you like oneliners

```ts
VENDOR="514c"; PRODUCT="8851"; for ev in /dev/input/event*; do udevadm info -q property -n "$ev" | grep -q "ID_VENDOR_ID=${VENDOR}" && udevadm info -q property -n "$ev" | grep -q "ID_MODEL_ID=${PRODUCT}" && echo "$ev"; done
``` -->

<!-- VENDOR="514c"; PRODUCT="8851"; for ev in /dev/input/event*; do udevadm info -q property -n "$ev" | grep -q "ID_VENDOR_ID=${VENDOR}" && udevadm info -q property -n "$ev" | grep -q "ID_MODEL_ID=${PRODUCT}" && echo "$ev"; done -->


```shell {1,2,4,7}
VENDOR="514c"
PRODUCT="8851"
for ev in /dev/input/event*; do
  props=$(udevadm info -q property -n "$ev")
  if echo "$props" | grep -q "ID_VENDOR_ID=${VENDOR}" && \
     echo "$props" | grep -q "ID_MODEL_ID=${PRODUCT}"; then
    echo "$ev"
  fi
done
```

<v-click>

This produces

```
/dev/input/event11
/dev/input/event12
```

Or something similar, depending on USB port

</v-click>

<!-- 

Here's a simple bash snippet that looks up all `/dev/input/event*` files and checks which device has registered it

we iterate over all of them and print only the ones exposed by the device matching VENDOR and PRODUCT

 -->

---
layout: center
---

# The fun begins!

---

# The fun begins!


<!-- 
todo - code walkthrough 

1. Scala native hello world is very simple
2. High level code is more convenient for working with events so I'll use fs2
3. The Grabber class will handle the low level part
4. Fs2 stream will orchestrate the logic handling the events -->


<v-clicks>

1. We know how to block (grab) the device for the rest of the OS with C API
2. We know how to find the relevant input files

</v-clicks>

<v-click>

Now it's just the matter of connecting it all together

</v-click>

---
layout: center
background: /plan.jpg
---

# The plan

---

# The plan

<v-clicks>

1. Scala Native hello world for a warmup
2. `Grabber` class to implement the `ioctl(fd, EVIOCGRAB, &grab);` for **capturing device events**
3. Model the `InputEvent` to read from the `/dev/input/eventN` file
4. Nice fs2 stream to process the events from file

</v-clicks>


---

# Meet Scala Native

```scala {1|2|7-8}{lines:true}
//> using platform native
//> using dep org.typelevel::cats-effect::3.7.0-RC1
package org.polyvariant.macropad4s
import cats.effect.{IO, IOApp, ExitCode}

object App extends IOApp {
  def run(args: List[String]): IO[ExitCode] = 
    IO.println("Hello!").as(ExitCode.Success)
}
```

<!-- 

Show of hands - have you used Scala | Scala.js | Scala Native? 🤚

 -->

<v-click>

Build with

```shell
scala --power package .
```

</v-click>

<v-click>

Produces runnable binary `org.polyvariant.macropad4s.App`

</v-click>

---

# The plan

1. ✅ Scala Native hello world for a warmup
2. `Grabber` class to implement the `ioctl(fd, EVIOCGRAB, &grab);` for **capturing device events**
3. Model the `InputEvent` to read from the `/dev/input/eventN` file
4. Nice fs2 stream to process the events from file

<!-- 

Warmup done now let's get our hands dirty

Now we'll be using the powers of Scala Native to invoke native C apis

 -->


---
layout: two-cols-header
---

# Grabber

::left::

Remember him?

```cpp
int main() {
  int fd = open("/dev/input/event0", O_RDONLY);
  int grab = 1;
  ioctl(
    fd,
    EVIOCGRAB,
    &grab
  );
  // close and return 0
}
```

::right::

---
layout: two-cols-header
---

# Grabber

::left::

Remember him?

```cpp {3-8}
int main() {
  int fd = open("/dev/input/event0", O_RDONLY);
  int grab = 1;
  ioctl(
    fd,
    EVIOCGRAB,
    &grab
  );
  // close and return 0
}
```

::right::


This is him now

```scala {2-8}{lines: true}
def grab(fd: FileDescriptor): IO[Int] = IO.delay {
  val grabValue = stackalloc[Byte]()
  !grabValue = 1.toByte
  ioctl(
    fd.value.get,
    EVIOCGRAB,
    grabValue
  )
}
```

---

# Grabber

In full context, with release logic

```scala {5-9|11-15}{lines: true}
object Grabber {
  import scala.scalanative.posix
  private val EVIOCGRAB: CLongInt = 0x40044590

  def grab(fileDescriptor: FileDescriptor): IO[Int] = IO.delay {
    val grabValue = stackalloc[Byte]()  // Allocate space for a CByte
    !grabValue = 1.toByte  // Set the value of the allocated memory to 1
    posix.sys.ioctl.ioctl(fileDescriptor.value.get, EVIOCGRAB, grabValue)
  }

  def release(fileDescriptor: FileDescriptor): IO[Int] = IO.delay {
    val grabValue = stackalloc[Byte]()  // Allocate space for a CByte
    !grabValue = 0.toByte  // Set the value of the allocated memory to 0
    posix.sys.ioctl.ioctl(fileDescriptor.value.get, EVIOCGRAB, grabValue)
  }

}
```

<!-- 

It could be refactored further, it just made more sense for the slide to keep it separate

 -->

---

# Grabber

and a small hack

```scala {5}{lines: true}
extension (fd: FileDescriptor) {
  // File descriptor doesn't give access to the int value
  // but leaks it in toString: FileDescriptor(33, readOnly=true)

  def value: Option[Int] = extractFileDescriptor(fd.toString())

  private def extractFileDescriptor(input: String): Option[Int] = 
    input.split("FileDescriptor\\(").toList match {
      case _ :: tail :: Nil => tail.split(", readOnly").headOption.map(_.toInt)
      case _ => None
    }

}
```

<!-- 

The *ioctl* function operates on *fd* which is an integer representing file descriptor

Java-compatible *FileDescriptor* doesn't provide that raw value but knows it, so we do a hack to extract it

Related disco https://discord.com/channels/632150470000902164/635668881951686686/1430175884005998673
 -->

---

# Grabber

Now given a file descriptor, wrap the grab logic into resource:

```scala {*}{lines:true}
object Grabber {
  /* ... */
  def resource(fileDescriptor: FileDescriptor): Resource[IO, Int] = 
    Resource.make(
      Grabber.grab(fileDescriptor)
    )(_ => Grabber.release(fileDescriptor).void)
}
```

---

# The plan

1. ✅ Scala Native hello world for a warmup
2. ✅ `Grabber` class to implement the `ioctl(fd, EVIOCGRAB, &grab);` for **capturing device events**
3. 👉 Model the `InputEvent` to read from the `/dev/input/eventN` file
4. Nice fs2 stream to process the events from file

---

# Event Interface

Quoting https://www.kernel.org/doc/Documentation/input/input.txt

```
5. Event interface
~~~~~~~~~~~~~~~~~~
  (...)  you'll always get a whole number of input events on a read. Their layout is:

struct input_event {
	struct timeval time;
	unsigned short type;
	unsigned short code;
	unsigned int value;
};

  'time' is the timestamp ...
  'code' is event code, for example REL_X or KEY_BACKSPACE ...
  'value' is the (...) 0 for EV_KEY for release, 1 for keypress and 2 for autorepeat.
```

---

# Event Interface


```scala {1|2-3|9-17|*}{lines: true}
case class InputEvent(sec: Long, usec: Long, eventType: Int, code: Int, value: Int) {
  val isKeyPress = eventType == EV_KEY && value == 1
  val isKeyRelease = eventType == EV_KEY && value == 0 
}

object InputEvent {
  val EventSize = 24 // bytes on 64-bit Linux
 
  def fromBytes(bytes: Array[Byte]) = {
    val buf   = ByteBuffer.wrap(bytes).order(ByteOrder.LITTLE_ENDIAN)
    val sec   = buf.getLong()
    val usec  = buf.getLong()
    val tpe   = buf.getShort() & 0xffff
    val code  = buf.getShort() & 0xffff
    val value = buf.getInt()
    InputEvent(sec, usec, tpe, code, value)
  }
    
}
```

<!-- 

We model the InputEvent case class following the docs, un-nesting the time to *sec* and *usec*

We hard-code the event size to 24 bytes following the C structure size, read the sequence of bytes and construct the case class instance out of it
 -->


---


# The plan

1. ✅ Scala Native hello world for a warmup
2. ✅ `Grabber` class to implement the `ioctl(fd, EVIOCGRAB, &grab);` for **capturing device events**
3. ✅ Model the `InputEvent` to read from the `/dev/input/eventN` file
4. 👉 Nice fs2 stream to process the events from file

---

# Read the input file

```scala {5-9|7,11-12|9,14-17,19-20|*}{lines: true}
object InputReader {
  import org.polyvariant.macropad4s.InputEvent.EventSize

  /** Open a device file and return its FileDescriptor along with a stream of InputEvents. */
  def openDevice(path: Path): Resource[IO, (FileDescriptor, Stream[IO, InputEvent])] =
    for {
      fis <- fileInputStream(path)
      fd   = fis.getFD
    } yield (fd, inputEvents(fis))

  private def fileInputStream(path: Path) =
    Resource.fromAutoCloseable(IO(new FileInputStream(path.toFile)))

  private def inputEvents(fis: FileInputStream) =
    rawBytes(fis)
      .chunkN(EventSize, allowFewer = false)
      .map(chunk => InputEvent.fromBytes(chunk.toArray))

  private def rawBytes(fis: FileInputStream) =
    readInputStream(IO.pure(fis), chunkSize = EventSize, closeAfterUse = false)
}
```


<!-- 

1. Opening a device yields FileDescriptor (for grabber) and InputStream for the client to consume

2. File input stream is an autoclosable resource of input stream

3. for input events we perform *readInputStream* from FS2, making sure the read chunk is the right size. In line 16 we disallow smaller chunks as they make no sense to us. The *closeAfterUse* is false because we delegate closing file to the separate resource


 -->

---
layout: center
background: /handshake.jpg
---

# Plan complete

Now join the building blocks together

<!-- 

The project is set up for scala native

Grabber is implemented using POSIX APIs

Events are modelled

Instrumentation for opening the file (retaining FD) and streaming events is there

 -->


---

# Macropad

```scala {1-3|10-13|7-14}{lines: true}
trait Macropad {
  def grabKeyboardEventsStream: Resource[IO, Stream[IO, InputEvent]]
}

object Macropad {

  def make(path: String): Macropad = 
    new Macropad {
      def grabKeyboardEventsStream: Resource[IO, Stream[IO, InputEvent]] = 
        for {
          (fd, stream) <- InputReader.openDevice(Paths.get(path))
          _            <- Grabber.resource(fd)
        } yield stream
    }
}
```

<!-- 

1. Let's write some nice high level API

2. See how we neatly compose two internal api calls, fd is captured by grabber, the stream is returned to the user. Upon closing the resource stream is closed, grabber is released and file is closed, all in those 2 lines

 -->

---

# Main application

```scala {3-4|7-9|10-17|13}{lines: true}
object App extends IOApp {
  def run(args: List[String]): IO[ExitCode] = {
    val defaultPath = "/dev/input/event11"
    val path = args.headOption.getOrElse(defaultPath)

    IO.println(s"Running keyboard grabber! $args") *>
      Macropad
        .make(path)
        .grabKeyboardEventsStream
        .use { stream =>
          stream
            .evalTap(event => IO.println(s"Found event: $event"))
            .evalTap(handleEvent)
            .compile
            .drain
        }
        .as(ExitCode.Success)
  }
  /* ... */
}
```

<!-- 

Here goes the main executable application

1. Macropad instance is created using our high level api, *grabKeyboardEventsStream* is used for obtaining the event stream

2. The resource is acquired and the stream is extended with logging and event handling

3. Closer look at event handling

 -->

---

# Main application

```scala {4-9|5-6|7-8|12-13,15-16|*}{lines: true}
object App extends IOApp {
  def run(args: List[String]): IO[ExitCode] = ???

  private def handleEvent(ev: InputEvent): IO[Unit] = {
    if (ev.isKeyPress && ev.code == KEY_1)
      IO.println(s"Got $ev turning vol down") *> volumeDown
    else if (ev.isKeyPress && ev.code == KEY_3) 
      IO.println(s"Got $ev turning vol up") *> volumeUp
    else IO.unit
  }

  private val volumeUp =
    runCommand(os.Shellable(List("amixer", "sset", "Master", "5%+")))

  private val volumeDown =
    runCommand(os.Shellable(List("amixer", "sset", "Master", "5%-")))

  private def runCommand(cmd: os.Shellable): IO[Unit] =
    IO.delay(os.call(cmd)).void
}
```

---
layout: center
---

# Let's run it! 🚀

---

# Run it! 🚀

```scala {1,2,3,4,11,18}
$ sudo -E ./org.polyvariant.macropad4s.App /dev/input/event25
Running keyboard grabber! List(/dev/input/event25)
Found event: InputEvent(1761481196,302464,4,4,458756)
Found event: InputEvent(1761481196,302464,1,30,1)
Found event: InputEvent(1761481196,302464,0,0,0)
Found event: InputEvent(1761481196,361474,4,4,458756)
Found event: InputEvent(1761481196,361474,1,30,0)
Found event: InputEvent(1761481196,361474,0,0,0)
Found event: InputEvent(1761481197,808404,4,4,458784)
Found event: InputEvent(1761481197,808404,1,4,1)
Got InputEvent(1761481197,808404,1,4,1) turning vol up
Found event: InputEvent(1761481197,808404,0,0,0)
Found event: InputEvent(1761481197,825337,4,4,458784)
Found event: InputEvent(1761481197,825337,1,4,0)
Found event: InputEvent(1761481197,825337,0,0,0)
Found event: InputEvent(1761481198,448605,4,4,458782)
Found event: InputEvent(1761481198,448605,1,2,1)
Got InputEvent(1761481198,448605,1,2,1) turning vol down
Found event: InputEvent(1761481198,448605,0,0,0)
Found event: InputEvent(1761481198,466345,4,4,458782)
Found event: InputEvent(1761481198,466345,1,2,0)
```

---

# Stream visualization


<img class="h-60" alt="" src="./aquascape-short.png" />


```scala {3-6}{lines:true}
Macropad.make(path).grabKeyboardEventsStream
  .use { stream =>
    stream
      .evalTap(event => IO.println(s"Found event: $event"))
      .evalTap(handleEvent)
      .compile
      .drain
  }
```

<!-- 

From line 6 upwards

1. The full stream is constructed and it pulls on *handleEvent* to produce value

2. It's ready to process event, so it pulls on the macropad events for one event

3. Macropad events first have nothing, we're wating some time for user input

4. User presses a key, some events (more than one!) are available

5. *handleEvent* processes the first event, it's not useful so we ignore it

6. Composed stream finished processing the first value, proceeds to the next one



 -->

---

# Stream visualization

Ignored key, then volume down

<img alt="" src="./aquascape-long.png" />

This effectively goes forever as long as the program is running

---

# Processing sequences

```scala {6-8}{lines:true}
Macropad
  .make(path)
  .grabKeyboardEventsStream
  .use { stream =>
    stream
      .groupWithin(Int.MaxValue, 1.second)
      .evalTap(chunk => IO.println(s"Found events: $chunk"))
      .evalTap(handleEvents) // processes Chunk[InputEvent]
      .compile
      .drain
  }
  .as(ExitCode.Success)
```

<v-click>

<img class="absolute bottom-0 right-0 w-220" src="./aquascape-window.png" />

</v-click>

---

# Key takeaways

* Scala Native is perfect for low level OS integrations
<v-clicks>

* The ecosystem is pretty stable
* Use fs2 for stream processing if you haven't already
* When buying a macropad - do your research 🕵️

</v-clicks>

---
layout: two-cols-header
---

# Macropad4s

::left::

Work in progress code available on GitHub

https://github.com/polyvariant/macropad4s

::right::

![](./repo-qr.png)


---
layout: two-cols-header
class: "outro-slide"
---

# Thank you!

::left::

<img class="w-70" alt="" src="./michal_pawlik.jpg" />

::right::


## Stay in touch! ✉️

<logos-bluesky mt-2/> [@michal.pawlik.dev](https://bsky.app/profile/michal.pawlik.dev)<br/>
<grommet-icons-blog/> [blog.michal.pawlik.dev](https://blog.michal.pawlik.dev)<br/>
<logos-linkedin/> [Michał Pawlik](https://www.linkedin.com/in/michał-pawlik)

<br/>
<br/>

<v-click>

### Questions?

</v-click>