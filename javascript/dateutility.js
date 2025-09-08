let chake = [];
/* let gday, gmonth, gyear; */
function changeToEthiopia1(d, m, y) {
  let ed, ey, em; //e stands for Ethiopia
  em = 5;
  ed = 0;
  let sum = 0;
  ey = y - 8;

  let a1 = [d, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let a2 = [d, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (y % 400 == 0 || (y % 4 == 0 && !(y % 100 == 0))) {
    if (
      ((m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) &&
        d > 0 &&
        d < 32) ||
      ((m == 4 || m == 6 || m == 9 || m == 11) && d > 0 && d <= 30) ||
      (m == 2 && d > 0 && d < 30)
    ) {
      for (let i = 0; i < m; i++) {
        sum = sum + a1[i];
      }
      for (let i = 1; i <= sum; i++) {
        if (i < 10) {
          ed = 21 + i;
          if (i > 1) {
            continue;
          }
          em--;
        } else {
          ed++;
          if (ed == 31) {
            ed = 1;
            em++;
          }
          let eyc = ey;
          eyc++;
          if (em == 13) {
            if (eyc % 400 == 0 || (eyc % 4 == 0 && !(eyc % 100 == 0))) {
              if (ed == 7) {
                ed = 1;
                em++;
              }
            } else {
              if (ed == 6) {
                ed = 1;
                em++;
              }
            }
          }
          if (em > 13) {
            if (em == 14) {
              ey++;
            }
            em -= 13;
          }
        }
      }

      ethday = ed;
      ethmonth = em;
      ethyear = ey;
    } else {
      // JOptionPane.showMessageDialog(null, "INVALID DATE", "ETHIOPIAN CALENDER", JOptionPane.PLAIN_MESSAGE);
    }
  } else {
    if (
      ((m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) &&
        d > 0 &&
        d < 32) ||
      ((m == 4 || m == 6 || m == 9 || m == 11) && d > 0 && d <= 30) ||
      (m == 2 && d > 0 && d < 29)
    ) {
      for (let i = 0; i < m; i++) {
        sum = sum + a2[i];
      }
      for (let i = 1; i <= sum; i++) {
        if (i < 9) {
          ed = 22 + i;
          if (i > 1) {
            continue;
          }
          em--;
        } else {
          ed++;
          if (ed == 31) {
            ed = 1;
            em++;
          }
          let eyc = ey;
          eyc++;
          if (em == 13) {
            if (eyc % 400 == 0 || (eyc % 4 == 0 && !(eyc % 100 == 0))) {
              if (ed == 7) {
                ed = 1;
                em++;
              }
            } else {
              if (ed == 6) {
                ed = 1;
                em++;
              }
            }
          }
          if (em > 13) {
            if (em == 14) {
              ey++;
            }
            em -= 13;
          }
        }
      }
      ethday = ed;
      ethmonth = em;
      ethyear = ey;
    } else {
      console.log("invalid input");
    }
  }
}

function changeToEthiopia(d, m, y) {
  let ed, ey, em; //e stands for Ethiopia
  em = 5;
  ed = 0;
  let sum = 0;
  ey = y - 8;

  let a1 = [d, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let a2 = [d, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (y % 400 == 0 || (y % 4 == 0 && !(y % 100 == 0))) {
    if (
      ((m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) &&
        d > 0 &&
        d < 32) ||
      ((m == 4 || m == 6 || m == 9 || m == 11) && d > 0 && d <= 30) ||
      (m == 2 && d > 0 && d < 30)
    ) {
      for (let i = 0; i < m; i++) {
        sum = sum + a1[i];
      }
      for (let i = 1; i <= sum; i++) {
        if (i < 10) {
          ed = 21 + i;
          if (i > 1) {
            continue;
          }
          em--;
        } else {
          ed++;
          if (ed == 31) {
            ed = 1;
            em++;
          }
          let eyc = ey;
          eyc++;
          if (em == 13) {
            if (eyc % 400 == 0 || (eyc % 4 == 0 && !(eyc % 100 == 0))) {
              if (ed == 7) {
                ed = 1;
                em++;
              }
            } else {
              if (ed == 6) {
                ed = 1;
                em++;
              }
            }
          }
          if (em > 13) {
            if (em == 14) {
              ey++;
            }
            em -= 13;
          }
        }
      }
      return {
        ethday: ed,
        ethmonth: em,
        ethyear: ey,
      };
    } else {
      // JOptionPane.showMessageDialog(null, "INVALID DATE", "ETHIOPIAN CALENDER", JOptionPane.PLAIN_MESSAGE);
    }
  } else {
    if (
      ((m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) &&
        d > 0 &&
        d < 32) ||
      ((m == 4 || m == 6 || m == 9 || m == 11) && d > 0 && d <= 30) ||
      (m == 2 && d > 0 && d < 29)
    ) {
      for (let i = 0; i < m; i++) {
        sum = sum + a2[i];
      }
      for (let i = 1; i <= sum; i++) {
        if (i < 9) {
          ed = 22 + i;
          if (i > 1) {
            continue;
          }
          em--;
        } else {
          ed++;
          if (ed == 31) {
            ed = 1;
            em++;
          }
          let eyc = ey;
          eyc++;
          if (em == 13) {
            if (eyc % 400 == 0 || (eyc % 4 == 0 && !(eyc % 100 == 0))) {
              if (ed == 7) {
                ed = 1;
                em++;
              }
            } else {
              if (ed == 6) {
                ed = 1;
                em++;
              }
            }
          }
          if (em > 13) {
            if (em == 14) {
              ey++;
            }
            em -= 13;
          }
        }
      }
      return {
        ethday: ed,
        ethmonth: em,
        ethyear: ey,
      };
    } else {
      console.log("invalid input");
    }
  }
}

function leapYear(y) {
  z = y + 1;
  if (z % 400 == 0 || (z % 4 == 0 && z % 100 != 0)) {
    return 6;
  } else {
    return 5;
  }
}

function toGregorian(d, m, y) {
  let ed, ey, em; //e stands for Ethiopia
  em = 5;
  ed = 0;
  let sum = 0;
  ey = y - 8;
  let a1 = [d, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let a2 = [d, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (y % 400 == 0 || (y % 4 == 0 && !(y % 100 == 0))) {
    if (
      ((m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) &&
        d > 0 &&
        d < 32) ||
      ((m == 4 || m == 6 || m == 9 || m == 11) && d > 0 && d <= 30) ||
      (m == 2 && d > 0 && d < 30)
    ) {
      for (let i = 0; i < m; i++) {
        sum = sum + a1[i];
      }
      for (let i = 1; i <= sum; i++) {
        if (i < 10) {
          ed = 21 + i;
          if (i > 1) {
            continue;
          }
          em--;
        } else {
          ed++;
          if (ed == 31) {
            ed = 1;
            em++;
          }
          let eyc = ey;
          eyc++;
          if (em == 13) {
            if (eyc % 400 == 0 || (eyc % 4 == 0 && !(eyc % 100 == 0))) {
              if (ed == 7) {
                ed = 1;
                em++;
              }
            } else {
              if (ed == 6) {
                ed = 1;
                em++;
              }
            }
          }
          if (em > 13) {
            if (em == 14) {
              ey++;
            }
            em -= 13;
          }
        }
      }

      //JOptionPane.showMessageDialog(null, "Day    Month   Year\n" + ed + "         " + em + "            " + ey, "ETHIOPIAN CALENDAR", JOptionPane.PLAIN_MESSAGE);
      chake[0] = ed;
      chake[1] = em;
      chake[2] = ey;
      //System.out.prletln(chake[0] + ":" + chake[1] + ":" + chake[2]);
    } else {
      //JOptionPane.showMessageDialog(null, "INVALID DATE", "ETHIOPIAN CALENDER", JOptionPane.PLAIN_MESSAGE);
    }
  } else {
    if (
      ((m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) &&
        d > 0 &&
        d < 32) ||
      ((m == 4 || m == 6 || m == 9 || m == 11) && d > 0 && d <= 30) ||
      (m == 2 && d > 0 && d < 29)
    ) {
      for (let i = 0; i < m; i++) {
        sum = sum + a2[i];
      }
      for (let i = 1; i <= sum; i++) {
        if (i < 9) {
          ed = 22 + i;
          if (i > 1) {
            continue;
          }
          em--;
        } else {
          ed++;
          if (ed == 31) {
            ed = 1;
            em++;
          }
          let eyc = ey;
          eyc++;
          if (em == 13) {
            if (eyc % 400 == 0 || (eyc % 4 == 0 && !(eyc % 100 == 0))) {
              if (ed == 7) {
                ed = 1;
                em++;
              }
            } else {
              if (ed == 6) {
                ed = 1;
                em++;
              }
            }
          }
          if (em > 13) {
            if (em == 14) {
              ey++;
            }
            em -= 13;
          }
        }
      }

      //JOptionPane.showMessageDialog(null, "Day  Month Year\n" + ed + "     " + em + "      " + ey, "ETHIOPIAN CALENDER", JOptionPane.PLAIN_MESSAGE);

      chake[0] = ed;
      chake[1] = em;
      chake[2] = ey;
      //System.out.prletln(chake[0] + ":" + chake[1] + ":" + chake[2]);
    } else {
      //JOptionPane.showMessageDialog(null, "INVALID DATE", "ETHIOPIAN CALENDER", JOptionPane.PLAIN_MESSAGE);
    }
  }
}

function getGregorianDate(d, m, y) {
  let gd, gm, gy;

  gy = y + 7;
  gm = m + 8;
  gd = 4;

  for (let i = gy; i <= y + 9; i++) {
    for (let j = 1; j < 13; j++) {
      for (let k = 1; k < 32; k++) {
        toGregorian(k, j, i);
        if (y == chake[2] && m == chake[1] && d == chake[0]) {
          gday = k;
          gmonth = j;
          gyear = i;

          return;
        }
      }
    }
  }
}

/* getGregorianDate(27, 9, 1991);

console.log("Year:", gyear);
console.log("Month:", gmonth);
console.log("Day:", gday);
 */
