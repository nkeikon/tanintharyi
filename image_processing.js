/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var tni = ee.FeatureCollection("users/nkeikon/myanmar_sr/TNI");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/* Nomura et al. 2019, 
'Oil palm concessions in southern Myanmar consist mostly of unconverted forest'
Corresponding author: keiko.nomura@ed.ac.uk
*/

var roi = tni;
var startDate = '2018-11-01';
var endDate = '2019-01-31';

Map.centerObject(tni, 7);

//mask clouds using the Sentinel-2 QA band
function maskS2clouds(img) {
    var qa = img.select('QA60').int16();

    // Bits 10 and 11 are clouds and cirrus, respectively.
    var cloudBitMask = Math.pow(2, 10);
    var cirrusBitMask = Math.pow(2, 11);

    // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
        qa.bitwiseAnd(cirrusBitMask).eq(0));

    // Return the masked and scaled data.
    return img.updateMask(mask);
}

// Compute cloudscore by selecting the least-cloudy pixel from the collection
// Originally written by Matt Hancher and adapted for Sentinel-2 by Ian Housman
// Bands, thresholds and other parameters were set by the author
var cloudThresh = 1; //Ranges from 1-100
var dilatePixels = 0; //Pixels to dilate around clouds 
var contractPixels = 0; //Pixels to reduce cloud mask and dark shadows by to reduce inclusion of single-pixel comission errors
var thresh_blue = [0.1, 0.4];
var thresh_aerosol = [0.1, 0.45];

var rescale = function(img, exp, thresholds) {
    return img.expression(exp, {
            img: img
        })
        .subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
};

function sentinelCloudScore(img) {
    var score = ee.Image(1.0);

    score = score.min(rescale(img, 'img.blue', thresh_blue));
    score = score.min(rescale(img, 'img.aerosol + img.cirrus', [0.15, 0.2]));
    score = score.min(rescale(img, 'img.aerosol', thresh_aerosol));
    var ndmi = img.normalizedDifference(['nir', 'swir1']);
    score = score.min(rescale(ndmi, 'img', [-0.1, 0.1]));

    score = score.multiply(100).byte();

    return img.addBands(score.rename('cloudScore'));
}

function bustClouds(img) {
    img = sentinelCloudScore(img);
    img = img.updateMask(img.select(['cloudScore']).gt(cloudThresh).focal_min(contractPixels).focal_max(dilatePixels).not());
    return img;
}

//S2 images
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterBounds(roi)
    .filterDate(startDate, endDate)
    .map(function(img) {
        var t = img.select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B10', 'B11', 'B12']).divide(10000); //Rescale to 0-1
        t = t.addBands(img.select(['QA60']));
        var out = t.copyProperties(img).copyProperties(img, ['system:time_start']);
        return out;
    })
    .select(['QA60', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B10', 'B11', 'B12'], ['QA60', 'aerosol', 'blue', 'green', 'red', 'red1', 'red2', 'red3', 'nir', 'red4', 'h2o', 'cirrus', 'swir1', 'swir2']);

var composite = collection.reduce(ee.Reducer.intervalMean(40, 60));
Map.addLayer(composite.clip(roi), {
    bands: ['red_mean', 'green_mean', 'blue_mean'],
    min: 0,
    max: 0.3
}, 'before masking', false);

var s2QA = collection.map(maskS2clouds);
var s2QAmean = s2QA.reduce(ee.Reducer.intervalMean(40, 60));
var s2QAimage = s2QAmean.clip(tni);
Map.addLayer(s2QAimage, {
    bands: ['red_mean', 'green_mean', 'blue_mean'],
    min: 0,
    max: 0.3
}, 'using QA clouds', false);

var cloudMaskedimage = collection.map(bustClouds);
var cloudMaskedmean = cloudMaskedimage.reduce(ee.Reducer.intervalMean(40, 60));
Map.addLayer(cloudMaskedmean.clip(tni), {
    bands: ['red_mean', 'green_mean', 'blue_mean'],
    min: 0,
    max: 0.3
}, 'using S2 cloudscore', false);

var cloudQA = s2QA.map(bustClouds);
var allmean = cloudQA.reduce(ee.Reducer.intervalMean(40, 60));
var all = allmean.clip(roi);
Map.addLayer(all, {
    bands: ['red_mean', 'green_mean', 'blue_mean'],
    min: 0,
    max: 0.3
}, 'using QA and S2 cloudscore (final image)');

// Choose image for classification
var s2bands = ['aerosol_mean', 'blue_mean', 'green_mean', 'red_mean', 'red1_mean', 'red2_mean', 'red3_mean', 'nir_mean', 'red4_mean', 'h2o_mean', 'cirrus_mean', 'swir1_mean', 'swir2_mean'];
var s2TNI = all.select(s2bands);

Export.image.toAsset({
    image: s2TNI,
    description: 's2image_asset',
    assetId: 's2image',
    region: roi.geometry().bounds(),
    crs: 'EPSG:4326',
    scale: 10,
    maxPixels: 1e13
});

Export.image.toDrive({
    image: s2TNI,
    description: 's2image_drive',
    region: roi.geometry().bounds(),
    crs: 'EPSG:4326',
    scale: 10,
    maxPixels: 1e13
});
