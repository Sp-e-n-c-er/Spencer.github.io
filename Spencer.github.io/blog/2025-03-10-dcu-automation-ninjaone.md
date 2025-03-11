---
slug: dcu-automation-ninjaone
title: "Streamlining Dell Updates with NinjaOne: A PowerShell Solution"
authors: sheath
tags: [powershell, ninjaone, dell, automation, system-management]
date: 2025-03-10
---

## Automating Dell System Updates

Managing updates for Dell systems can be a time-consuming task, especially across multiple devices. To address this, I’ve developed a PowerShell script that integrates Dell Command Update (DCU) with NinjaOne, automating the process from installation to execution. This post walks through what it does, how it works, and how you can deploy it in your environment.

### Purpose and Features

Dell Command Update is a powerful tool for keeping Dell systems current with the latest BIOS, firmware, drivers, and applications. My script takes it a step further by automating key operations within NinjaOne, an RMM platform I use extensively. Here’s what it offers:

- **System Validation**: Confirms the device is a Dell system and removes conflicting "Dell Update" applications that could interfere with DCU.
- **Dynamic Installation**: Downloads and installs the latest DCU version directly from Dell’s support site, ensuring you’re always up to date.
- **Customizable Scans**: Supports general scans for all updates or targeted BIOS/firmware scans, with results logged to NinjaOne custom fields (except for general scans, which output to CLI).
- **Flexible Updates**: Options to install all updates, exclude BIOS/firmware, or focus solely on BIOS/firmware, all triggered via a single NinjaOne variable.
- **NinjaOne Integration**: Updates custom fields (`DCU1` for status, `DCU2` for details) to streamline monitoring and reporting.

### Configuration

The script is controlled through a NinjaOne dropdown variable named `pleaseSelectAnOptionToRun`. You’ll need to set this up with the following options:

- **Install**: Installs DCU after removing incompatible apps.
- **Remove Incompatible Versions**: Cleans up conflicting Dell Update software.
- **Run Scan**: Performs a full update scan, outputting results to the CLI.
- **Run BIOS and Firmware Scan**: Scans for BIOS/firmware updates, logging to NinjaOne fields.
- **Run Scan And Install All**: Scans and applies all available updates.
- **Run Scan And Install Excluding BIOS and Firmware**: Applies updates, skipping BIOS/firmware.
- **Run Scan And Install BIOS and Firmware ONLY**: Targets only BIOS/firmware updates.
### Technical Overview

Here’s a breakdown of the script’s core functionality:

- **Pre-Installation Checks**: Scans the registry (`HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall`) to uninstall incompatible Dell Update apps silently, ensuring a clean slate for DCU.
- **DCU Download**: Uses `Invoke-RestMethod` to scrape Dell’s support page for the latest DCU `.exe`, then downloads it with `Invoke-WebRequest`—no manual URL hunting required.
- **Execution Logic**: Leverages `dcu-cli.exe` with tailored arguments (e.g., `-silent`, `-updateType`) to scan or apply updates. Exit codes are mapped to descriptive statuses in NinjaOne fields:
  - `0`: Updates available.
  - `500`: No updates found.
  - `1, 5`: Reboot required.
  - Full mapping in the script’s `Handle-DCUExitCode` function.
- **Error Handling**: Wraps operations in try-catch blocks, logging failures to NinjaOne for easy troubleshooting.

The full script is available on my GitHub: [Public-Ninja-One-Scripts](https://github.com/Sp-e-n-c-er/Public-Ninja-One-Scripts/blob/main/Dell%20Command%20Update/Dell%20Command%20Update%20Automation%20Toolkit.ps1).

### Benefits

- **Efficiency**: Automates repetitive update tasks across Dell fleets.
- **Visibility**: Integrates with NinjaOne’s custom fields for real-time status tracking.
- **Control**: Offers granular options to suit different update strategies.
- **Open Source**: Released under the MIT License—free to use, modify, and distribute.

### Deployment Steps

1. **Download**: Grab the script from [GitHub](https://github.com/Sp-e-n-c-er/Public-Ninja-One-Scripts/blob/main/Dell%20Command%20Update/Dell%20Command%20Update%20Automation%20Toolkit.ps1).
2. **Configure NinjaOne**: Add the `pleaseSelectAnOptionToRun` dropdown with the listed options.
3. **Run**: Deploy it via NinjaOne’s script engine and monitor results in your custom fields.

### Notes and Disclaimer

This script is provided under the MIT License—use it freely, but at your own risk. I’m not liable for any issues that arise; see the full license at [opensource.org/licenses/MIT](https://opensource.org/licenses/MIT) for details. It’s been tested in my environment, but always validate in yours before going full throttle.

### Feedback Welcome

Have thoughts or suggestions? Reach out on [GitHub](https://github.com/Sp-e-n-c-er) or [Discord](https://discordapp.com/users/286552274099240960). I’m considering enhancements like automatic version checks or expanded error reporting—let me know what you’d like to see!

Thanks for reading—happy automating!

*Spencer Heath, 10 March 2025*