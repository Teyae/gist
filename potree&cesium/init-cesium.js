import urlConfig from './config.js'
import { Loading } from 'element-ui';
// import * as api from '../api/fetchData.js'

var viewer;
var terrain;
var tilesethy, tilesetst, tilesetsht, tilesettz;
var entity0, entity1, entity2, entity3, entity4;
var init = {
	initCesium: function() {
		var layer = new Cesium.UrlTemplateImageryProvider({
			tileWidth: 256,
			tileHeight: 256,
			url: 'http://t{R}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=f5253ac66f4ffbbef4c8cbb9fb5cb1f3',
			maximumLevel: 18,
			customTags: {
				R: function(imageryProvider, x, y, level) {
					return Math.floor(Math.random() * 6)
				}
			}
		});
		var layer0 = new Cesium.UrlTemplateImageryProvider({
			tileWidth: 256,
			tileHeight: 256,
			url: 'http://t{R}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=f5253ac66f4ffbbef4c8cbb9fb5cb1f3',
			maximumLevel: 18,
			customTags: {
				R: function(imageryProvider, x, y, level) {
					return Math.floor(Math.random() * 6)
				}
			}
		});
		var tiandiMapModel = new Cesium.ProviderViewModel({
			name: "天地图",
			iconUrl: Cesium.buildModuleUrl(
				"Widgets/Images/ImageryProviders/esriWorldStreetMap.png"
			),
			tooltip: "天地图服务",
			creationFunction: function() {
				return layer; //可以返回数据组
			}
		});
		var tiandiMapModel0 = new Cesium.ProviderViewModel({
			name: "天地图影像",
			iconUrl: Cesium.buildModuleUrl(
				"Widgets/Images/ImageryProviders/esriWorldImagery.png"
			),
			tooltip: "天地图影像服务",
			creationFunction: function() {
				return layer0; //可以返回数据组
			}
		});
		terrain=new Cesium.CesiumTerrainProvider({
				// url: 'http://192.168.2.203:12580/terrain'
				url : urlConfig.terrainUrl
			}),
		viewer = new Cesium.Viewer('cesiumContainer', {
			terrainProvider: terrain,
			imageryProviderViewModels: [tiandiMapModel0, tiandiMapModel],
			selectedImageryProviderViewModel: tiandiMapModel0,
			terrainProviderViewModels: [],
			geocoder: false,
			homeButton: false,
			// shadows: true,
			// terrainShadows: Cesium.ShadowMode.ENABLED,
			sceneModePicker: false,
			baseLayerPicker: true,
			navigationHelpButton: false,
			animation: false,
			timeline: false,
			fullscreenButton: false,
			vrButton: false,
			selectionIndicator: false,
			infoBox: false,
			shouldAnimate : true//飞行需要使用
		});
		$(".cesium-baseLayerPicker-sectionTitle")[0].innerHTML = '地图';
		
		// 添加天地图注记
		var image = new Cesium.UrlTemplateImageryProvider({
			tileWidth: 256,
			tileHeight: 256,
			url: 'http://t{R}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=f5253ac66f4ffbbef4c8cbb9fb5cb1f3',
			maximumLevel: 21,
			customTags: {
				R: function(imageryProvider, x, y, level) {
					return Math.floor(Math.random() * 6)
				}
			}
		})
		viewer.imageryLayers.addImageryProvider(image);
		
		// 开启地形遮挡
		viewer.scene.globe.depthTestAgainstTerrain = true;
		
		//禁用entity双击事件
		viewer.trackedEntity = undefined;
		viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
			Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
		);
		
		// 使用光照
		viewer.scene.globe.enableLighting = true

		//设置默认视角
		viewer.camera.setView({
			destination: window.Cesium.Cartesian3.fromDegrees(120.15, 30.26, 1100000),
			orientation: {
				heading: window.Cesium.Math.toRadians(0),
				pitch: window.Cesium.Math.toRadians(-90),
				roll: window.Cesium.Math.toRadians(0)
			}
		});
		viewer.scene.camera.moveEnd.addEventListener(init.onMoveendMap);
		var options = {};
		options.enableCompass = true;
		options.enableZoomControls = true;
		options.enableDistanceLegend = true;
		options.enableCompassOuterRing = true;
		viewer.extend(window.Cesium.viewerCesiumNavigationMixin, options);
	}
}

export {
	init, viewer, entity0, entity1, entity2, entity3, entity4
}
