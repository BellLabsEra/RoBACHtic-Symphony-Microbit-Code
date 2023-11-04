def stateTransitions(nextOctave: number, nextNoteIndex: number):
    serial.write_string("" + str(readPianoKeyboardInput()))
    serial.write_line("" + (notes_dictionary[readPianoKeyboardInput()]))
    if nextOctave == 0:
        if nextNoteIndex == 1 or nextNoteIndex == 2:
            serial.write_line("G-String")
        elif nextNoteIndex == 3 or nextNoteIndex == 4 or nextNoteIndex == 5 or nextNoteIndex == 6 or nextNoteIndex == 7 or nextNoteIndex == 8 or nextNoteIndex == 9:
            serial.write_line("D-String")
        elif nextNoteIndex == 10 or nextNoteIndex == 11 or nextNoteIndex == 12:
            serial.write_line("A-String")
        else:
            serial.write_line("Invalid")
    elif nextOctave == 1:
        if nextNoteIndex == 1 or nextNoteIndex == 2 or nextNoteIndex == 3 or nextNoteIndex == 4:
            serial.write_line("A-String")
        elif nextNoteIndex == 5 or nextNoteIndex == 6 or nextNoteIndex == 7:
            serial.write_line("E-String")
        elif nextNoteIndex == 8 or nextNoteIndex == 9 or nextNoteIndex == 10 or nextNoteIndex == 11 or nextNoteIndex == 12:
            serial.write_line("G-String")
        else:
            serial.write_line("Invalid")
def readPianoKeyboardInput():
    global MSB, LSB_2, LSB_1, LSB_0, keyboard_input_decimal_representation
    MSB = pins.digital_read_pin(DigitalPin.P16)
    LSB_2 = pins.digital_read_pin(DigitalPin.P15)
    LSB_1 = pins.digital_read_pin(DigitalPin.P14)
    LSB_0 = pins.digital_read_pin(DigitalPin.P13)
    keyboard_input_decimal_representation = MSB * 8 + LSB_2 * 4 + LSB_1 * 2 + LSB_0 * 1
    return keyboard_input_decimal_representation
keyboard_input_decimal_representation = 0
LSB_0 = 0
LSB_1 = 0
LSB_2 = 0
notes_dictionary: List[str] = []
MSB = 0
current_state = 0
next_state = 0
staccato_legato_state = 0
octave_scale = 0
MSB = 0
_this = 0
notes_dictionary = ["IDLE",
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
    "X"]
midi_notes_octave1_dict = [0,
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
    "0",
    "0",
    "0"]
midi_notes_octave1_dict = [0,
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
    0]

def on_forever():
    stateTransitions(1, readPianoKeyboardInput())
basic.forever(on_forever)
