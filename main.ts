function stateTransitions (nextOctave: number, nextNoteIndex: number) {
    serial.writeString("" + readPianoKeyboardInput())
    serial.writeLine("" + (notes_dictionary[readPianoKeyboardInput()]))
    if (nextOctave == 0) {
        let midi_notes_octave0_dict: number[] = []
        if (nextNoteIndex == 1 || nextNoteIndex == 2) {
            serial.writeLine("G-String")
        } else if (nextNoteIndex == 3 || nextNoteIndex == 4 || nextNoteIndex == 5 || nextNoteIndex == 6 || nextNoteIndex == 7 || nextNoteIndex == 8 || nextNoteIndex == 9) {
            serial.writeLine("D-String")
        } else if (nextNoteIndex == 10 || nextNoteIndex == 11 || nextNoteIndex == 12) {
            serial.writeLine("A-String")
        } else {
            serial.writeLine("Invalid")
        }
        music.play(music.tonePlayable(midi_notes_octave0_dict[nextNoteIndex], music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
    } else if (nextOctave == 1) {
        if (nextNoteIndex == 1 || nextNoteIndex == 2 || nextNoteIndex == 3 || nextNoteIndex == 4) {
            serial.writeLine("A-String")
        } else if (nextNoteIndex == 5 || nextNoteIndex == 6 || nextNoteIndex == 7) {
            serial.writeLine("E-String")
        } else if (nextNoteIndex == 8 || nextNoteIndex == 9 || nextNoteIndex == 10 || nextNoteIndex == 11 || nextNoteIndex == 12) {
            serial.writeLine("G-String")
        } else {
            serial.writeLine("Invalid")
        }
        music.play(music.tonePlayable(midi_notes_octave1_dict[nextNoteIndex], music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
    }
}
function readPianoKeyboardInput () {
    MSB = pins.digitalReadPin(DigitalPin.P16)
    LSB_2 = pins.digitalReadPin(DigitalPin.P15)
    LSB_1 = pins.digitalReadPin(DigitalPin.P14)
    LSB_0 = pins.digitalReadPin(DigitalPin.P13)
    keyboard_input_decimal_representation = MSB * 8 + LSB_2 * 4 + LSB_1 * 2 + LSB_0 * 1
    return keyboard_input_decimal_representation
}
let keyboard_input_decimal_representation = 0
let LSB_0 = 0
let LSB_1 = 0
let LSB_2 = 0
let midi_notes_octave1_dict: number[] = []
let notes_dictionary: string[] = []
let MSB = 0
let current_state = 0
let next_state = 0
let staccato_legato_state = 0
let octave_scale = 0
MSB = 0
let _this = 0
notes_dictionary = [
"IDLE",
"C",
"C#",
"D",
"D#",
"E",
"F",
"F#",
"G",
"G#",
"A",
"A#",
"B",
"X",
"X",
"X"
]
midi_notes_octave1_dict = [
0,
262,
277,
294,
311,
330,
349,
370,
392,
415,
440,
466,
494,
0,
0,
0
]
midi_notes_octave1_dict = [
0,
523,
554,
587,
622,
659,
698,
740,
196,
208,
220,
233,
247,
0,
0,
0
]
basic.forever(function () {
    stateTransitions(0, readPianoKeyboardInput())
})
