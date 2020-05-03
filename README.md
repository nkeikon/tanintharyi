# Oil palm concessions in southern Myanmar consist mostly of unconverted forest
Nomura, K., Mitchard, E.T., Patenaude, G., Bastide, J., Oswald, P. and Nwe, T., 2019. Scientific reports, 9(1), pp.1-9.

1. image processing
2. classification
3. area estimate

The map is available in geotiff format: https://datashare.is.ed.ac.uk/handle/10283/3377; or as an interactive map: https://nkeikon.users.earthengine.app/view/tanintharyi-oil-palm-and-rubber-map

# Abstract
The increased demand for palm oil has led to an expansion of oil palm concessions in the tropics, and the clearing of abundant forest as a result. However, concessions are typically incompletely planted to varying degrees, leaving much land unused. The remaining forests within such concessions are at high risk of deforestation, as there are normally no legal hurdles to their clearance, therefore making them excellent targets for conservation. We investigated the location of oil palm plantations and the other major crop – rubber plantations in southern Myanmar, and compared them to concession boundaries. Our results show that rubber plantations cover much larger areas than oil palm in the region, indicating that rubber is the region’s preferred crop. Furthermore, only 15% of the total concession area is currently planted with oil palm (49,000 ha), while 25,000 ha is planted outside concession boundaries. While this may in part be due to uncertain and/or changing boundaries, this leaves most of the concession area available for other land uses, including forest conservation and communities’ livelihood needs. Reconsidering the remaining concession areas can also significantly reduce future emission risks from the region.

**Update (based on PhD defence)**

The method to split reference data into training and testing data or use a subset of training data for cross-validation ("holdout" or "Out of the Box Testing") is a common approach in supervised classification using machine learning algorithms (Foody, 2017; Fardanesh and Ersoy, 1998; Prechelt, 1998; Huynh and Setiono, 2005). We therefore took such an approach in our study, randomly assigning pixels within our dataset to ’test’ or ’training’ datasets.

However, depending on how training and testing are sampled, there is a risk of auto-correlation and thus over-estimation of the true map accuracy (Foody, 2017; Millard and Richardson, 2015; Twomey and Smith, 1998). Our approach, randomly selecting pixels from within the same polygons and assigning them to test or training sets, is prone to this criticism. Furthermore, our active selection of training and test datasets only from areas where from field knowledge and the presence of high resolution remote sensing data we had high confidence in that particular land cover, also has a tendency to inflate accuracy. These problems have been faced by other studies mapping land cover, who have used similar methods as ours (e.g. Draper et al., 2014; Yu et al., 2016; Cheng et al., 2016; Margono et al., 2014; Immitzer, Vuolo, and Atzberger, 2016). We chose to do this however because alternative approaches had significant issues:

1. Finding training areas where we were confident, and pixels were a certain, unmixed class was very challenging in our study sites, due to its complex landscapes. Assigning a random pixel across the image to a particular class with confidence was highly unlikely, meaning a test dataset designed such a way would have contained unreliable data.

2. Choosing a random set of our training polygons, rather than pixels within those polygons as test data, would have involved removing key training sites, resulting in withholding necessary information for a classifier to produce a more accurate map.

We followed guidance from Olofsson et al. (2014) on calculating area-based uncertainty.

*References*
- Foody, Giles M. (2017). “Impacts of Sample Design for Validation Data on
the Accuracy of Feedforward Neural Network Classification”. en. In: Applied
Sciences 7.9, p. 888. doi: 10.3390/app7090888. url: https://www.mdpi.
com/2076-3417/7/9/888.
- Fardanesh, M.T. and O.K. Ersoy (1998). “Classification accuracy improvement of
neural network classifiers by using unlabeled data”. In: IEEE Transactions on
Geoscience and Remote Sensing 36.3, pp. 1020–1025. issn: 0196-2892, 1558-0644. doi: 10.1109/36.673695.
- Prechelt, Lutz (1998). “Automatic early stopping using cross validation: quantifying
the criteria”. In: Neural Networks 11.4, pp. 761–767. issn: 0893-6080. doi:
10.1016/S0893-6080(98)00010-0. url: http://www.sciencedirect.com/science/article/pii/S0893608098000100
- Huynh, T.Q. and R. Setiono (2005). “Effective neural network pruning using crossvalidation”.
In: Proceedings. 2005 IEEE International Joint Conference on
Neural Networks, 2005. Vol. 2. ISSN: 2161-4393, 2161-4407, 972–977 vol. 2.doi: 10.1109/IJCNN.2005.1555984.
- Millard, Koreen and Murray Richardson (2015). “On the Importance of Training
Data Sample Selection in Random Forest Image Classification: A Case Study
in Peatland Ecosystem Mapping”. en. In: Remote Sensing 7.7, pp. 8489–8515.
doi: 10.3390/rs70708489. url: https://www.mdpi.com/2072-4292/7/7/8489.
- Twomey, J.M. and A.E. Smith (1998). “Bias and variance of validation methods
for function approximation neural networks under conditions of sparse
data”. In: IEEE Transactions on Systems, Man, and Cybernetics, Part C (Applications
and Reviews) 28.3, pp. 417–430. issn: 1094-6977, 1558-2442. doi:10.1109/5326.704579.
- Draper, Frederick C., Katherine H. Roucoux, Ian T. Lawson, Edward T. A.
Mitchard, Euridice N. Honorio Coronado, Outi Lähteenoja, Luis Torres Montenegro,
Elvis Valderrama Sandoval, Ricardo Zaráte, and Timothy R. Baker
(2014). “The distribution and amount of carbon in the largest peatland complex
in Amazonia”. en. In: Environmental Research Letters 9.12, p. 124017.
- Yu, Le, Haohuan Fu, Bo Wu, Nicolas Clinton, and Peng Gong (2016). “Exploring
the potential role of feature selection in global land-cover mapping”. In:
International Journal of Remote Sensing 37.23, pp. 5491–5504. issn: 0143-1161. doi: 10.1080/01431161.2016.1244365. url: https://doi.org/10.1080/01431161.2016.1244365
- Cheng, Yuqi, Le Yu, Arthur P. Cracknell, and Peng Gong (2016). “Oil palm
mapping using Landsat and PALSAR: a case study in Malaysia”. In: International
Journal of Remote Sensing 37.22, pp. 5431–5442. issn: 0143-1161.
doi: 10.1080/01431161.2016.1241448. url: https://doi.org/10.1080/01431161.2016.1241448
- Margono, Belinda Arunarwati, Peter V. Potapov, Svetlana Turubanova, Fred
Stolle, and Matthew C. Hansen (2014). “Primary forest cover loss in Indonesia
over 2000-2012”. en. In: Nature Climate Change 4.8, pp. 730–735. issn: 1758-6798. doi: 10 . 1038 / nclimate2277. url: https : / / www . nature . com /articles/nclimate2277
- Immitzer, Markus, Francesco Vuolo, and Clement Atzberger (2016). “First Experience
with Sentinel-2 Data for Crop and Tree Species Classifications in
Central Europe”. In: Remote Sensing 8.3. WOS:000373627400021. issn: 2072-4292. doi: 10.3390/rs8030166.
- Olofsson, Pontus, Giles M. Foody, Martin Herold, Stephen V. Stehman, Curtis
E. Woodcock, and Michael A. Wulder (2014). “Good practices for estimating
area and assessing accuracy of land change”. In: Remote Sensing of
Environment 148, pp. 42–57. issn: 0034-4257. doi: 10.1016/j.rse.2014.
02.015. url: http://www.sciencedirect.com/science/article/pii/S0034425714000704
