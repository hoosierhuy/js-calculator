// Check to see if local storage is supported.
function hasLocalStorage() {
  const checkLocalStorage = "checkLocalStorage"

  try {
    localStorage.setItem(checkLocalStorage, checkLocalStorage)
    localStorage.removeItem(checkLocalStorage)

    return true
  } catch (err) {
    console.log("Your browser does not support Local Storage.")

    return false
  }
}

const Calculator = {
  // Calculator output
  display: (val) => (document.getElementById("calcDisplay").value = val),
  // Values and math operations
  type: (val) => (document.getElementById("calcDisplay").value += val),
  // Evaluate the equation
  evaluate: function () {
    try {
      this.display(eval(document.getElementById("calcDisplay").value))
    } catch (err) {
      throw new Error("Error")
    }
  },
  saveMem: function () {
    const mem = document.getElementById("calcDisplay").value

    if (hasLocalStorage()) {
      localStorage.setItem("CalculatorData", mem)
    }

    // Temporarily hold what was displayed
    let temp = document.getElementById("calcDisplay").value
    // Inform user the save succeeded
    document.getElementById("calcDisplay").value = "Saved!"
    // Replace the value that was there before
    setTimeout(
      () => (document.getElementById("calcDisplay").value = temp),
      1000
    )
  },
  recallMem: function () {
    if (hasLocalStorage()) {
      let mem = localStorage.getItem("CalculatorData")
      // Check if there was anything stored in memory
      if (mem !== null) {
        document.getElementById("calcDisplay").value = mem
      }
      // Nothing was stored in memory --> output error
      else {
        // temporarily hold what was displayed
        let temp = document.getElementById("calcDisplay").value
        // Inform user error message
        document.getElementById("calcDisplay").value = "Error"
        // Replace the value that was there before
        setTimeout(
          () => (document.getElementById("calcDisplay").value = temp),
          1000
        )
      }
    }
  },
  clearMem: function () {
    localStorage.clear()

    // Inform user successfully cleared
    document.getElementById("calcDisplay").value = "Cleared"
    // Cleared out the stored value that was deleted from localStorage
    setTimeout(() => (document.getElementById("calcDisplay").value = ""), 1000)
  },
}
