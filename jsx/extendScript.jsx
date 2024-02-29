$.runScript = {
    newSequenceFromProjectSelection: function () {
        var viewIDs = app.getProjectViewIDs();
        var viewSelection = app.getProjectViewSelection(viewIDs[0]);

        if (viewSelection) {
            // Prompt user for sequence names
            var sequenceName1 = prompt("Enter name for sequence 1:", "New Sequence 1");
            var sequenceName2 = prompt("Enter name for sequence 2:", "New Sequence 2");

            // Create sequences
            var newSequence1 = app.project.createNewSequenceFromClips(sequenceName1, viewSelection, app.project.rootItem);
            var newSequence2 = app.project.createNewSequenceFromClips(sequenceName2, viewSelection, app.project.rootItem);

            // Disable Audio Clips in each sequence
            disableAudioClips(newSequence1);
            disableAudioClips(newSequence2);

            // Inform user
            alert("Two sequences created successfully:\n" + sequenceName1 + "\n" + sequenceName2);
        } else {
            alert("No project items selected (or a bin was selected).");
        }
    }
};

function disableAudioClips(sequence) {
    var audioTracks = sequence.audioTracks;
    for (var i = 0; i < audioTracks.numTracks; i++) {
        var audioTrack = audioTracks[i];
        for (var j = 0; j < audioTrack.clips.numItems; j++) {
            var currentClip = audioTrack.clips[j];
            if (currentClip && !currentClip.disabled) {
                currentClip.disabled = true;
            }
        }
    }
}
