$.runScript = function() {
    // Adobe Premiere Pro ExtendScript

    // Define the active sequence
    var sequence = app.project.activeSequence;

    // Mute and export each audio track
    if (sequence) {
        for (var i = 0; i < sequence.audioTracks.numTracks; i++) {
            var currentTrack = sequence.audioTracks[i];
            
            // Mute or unmute the track
            var muteState = currentTrack.isMuted() ? 0 : 1;
            currentTrack.setMute(muteState);

            // Export the sequence
            var exportSettings = new ExportSettings();
            exportSettings.fileName = sequence.name + "_export_" + i; // Use a unique name for each export
            exportSettings.matchSequenceSettings = true; // Match sequence settings
            app.project.exportSequence(sequence, exportSettings);
        }
    } else {
        $._PPP_.updateEventPanel("No active sequence.");
    }
};
