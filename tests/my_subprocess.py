"""Simple helper to run subprocesses and print output in real-time.

Usage:
  python3 my_subprocess.py ls -la
  python3 my_subprocess.py        # runs a sensible default (ping on macOS)

This prints stdout+stderr lines as they arrive (line-buffered).
"""

import subprocess
import sys
import shlex


def run_subprocess(cmd):
    """Run command (list or str) and print stdout/stderr in real-time.

    Args:
            cmd: list[str] or str - command to run. If str, it will be split.

    Returns:
            int: process exit code.
    """
    if isinstance(cmd, str):
        # Split command string into list.
        cmd = shlex.split(cmd)

    # Start process with merged stdout+stderr, text mode and line buffering.
    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
        universal_newlines=True,
    )
    output = ""
    try:
        # Iterate over stdout lines as they become available.
        for line in proc.stdout:
            # Print each line immediately.
            print(line, end="", flush=True)
            output += line
    except Exception as e:
        print(f"Error reading subprocess output: {e}", file=sys.stderr)
    finally:
        proc.stdout.close()

    return output

def _default_command():
    # On macOS/linux 'ping' exists; use a short ping by default so demo finishes.
    return ["ping", "8.8.8.8"]


if __name__ == "__main__":
    # If user passed arguments, use them as command; otherwise use default.
    if len(sys.argv) > 1:
        command = sys.argv[1:]
    else:
        command = _default_command()

    output = run_subprocess(command)
    print(f"\nProcess exited with code {output.returncode}")
    print(f"stdout: {output}")
    print(f"stderr: {output}")

