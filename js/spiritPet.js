"use strict";

function getPetUnlockModal(petID) {
    let modal = {
        title: getPetsName("COMPLETION", "LOG_PETS_UNLOCKED"),
        html: '<span class="text-success">' + PETS[petID].name + '</span><br><small class="text-info">' + PETS[petID].description + "</small><div class='h5 font-w300 font-size-sm pt-4 mb-0 text-warning'><em>" + getPetsName("COMPLETION", "LOG_PETS_MISC") + "</em></div>",
        imageUrl: PETS[petID].media,
        imageWidth: 128,
        imageHeight: 128,
        imageAlt: "Pet",
    };
    return modal;
}
