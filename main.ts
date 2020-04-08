input.onButtonPressed(Button.B, function () {
    run = 1
    basic.showLeds(`
        # . # . #
        . # # # .
        # # # # #
        . # # # .
        # . # . #
        `)
})
let x = 0
let run = 0
run = 0
basic.showIcon(IconNames.Asleep)
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
basic.showIcon(IconNames.Happy)
basic.forever(function () {
    if (run == 1 && mbit_Robot.Ultrasonic_Car() >= 5) {
        huskylens.request()
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            x = huskylens.readeBox(1, Content1.xCenter)
            if (x < 110) {
                mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Left, 33)
            }
            if (x <= 210 && x >= 110) {
                mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, 33)
            }
            if (x > 210) {
                mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Right, 33)
            }
        } else {
            mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
        }
    } else {
        mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
    }
})
