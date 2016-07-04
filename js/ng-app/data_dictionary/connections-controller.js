;(function() {

  angular
    .module('ferryApp')
    .controller('DDConnectionsController', DDConnectionsController);

  DDConnectionsController.$inject = ["$scope", "$mdSidenav", "$timeout", "$mdDialog", "$location", "$rootScope"];

  function DDConnectionsController($scope, $mdSidenav, $timeout, $mdDialog, $location, $rootScope) {

      console.log("DataDictionary - Connections - Controller Initialized.");

      $scope.connections = [];
      $scope.dataStoreTypes = [];
      $scope.newConn = { connectionName: '', connectionType: ''};

      $scope.getConnections = function() {
        $scope.connections.push({
          connectionName: 'Customer Service OLTP Database',
          connectionType: "MySQL",
          connectionString: "jdbc:mysql://192.168.101.120:3144/customer-db"
        },
        {
          connectionName: 'Enterprise Datawarehouse',
          connectionType: "Microsoft SQL Server",
          connectionString: "jdbc:mssql://192.168.101.120:3014/dwfl"
        },
        {
          connectionName: 'Backoffice Datalake',
          connectionType: "HDFS",
          connectionString: "hdfs://192.168.101.120:10020/datalake"
        },
        {
          connectionName: 'Customer Rating API',
          connectionType: "REST",
          connectionString: "http://mywebserver.organization.com:8091/api/v1/customer/rating"
        },
        {
          connectionName: 'Order Entry Event',
          connectionType: "Rabbit MQ",
          connectionString: "amqp://myqueyeserver.org.net:3523/orderentrytopic"
        },
        {
          connectionName: 'Customer Info Spreadsheet',
          connectionType: "EXCEL",
          connectionString: "amqp://myqueyeserver.org.net:3523/orderentrytopic"
        },
        {
          connectionName: 'Customer Info CSV',
          connectionType: "CSV",
          connectionString: "amqp://myqueyeserver.org.net:3523/orderentrytopic"
        })
      }

      $scope.getStoreTypes = function() {
        $scope.dataStoreTypes.push({
          dataStoreTypeCode: 'MYSQL',
          dataStoreTypeName: 'MySQL'
        },
        {
          dataStoreTypeCode: 'ORACLESQL',
          dataStoreTypeName: 'Oracle'
        },
        {
          dataStoreTypeCode: 'MSSQL',
          dataStoreTypeName: 'Microsoft SQL Server'
        },
        {
          dataStoreTypeCode: 'POSTGRESQL',
          dataStoreTypeName: 'PostgreSQL'
        },
        {
          dataStoreTypeCode: 'HDFS',
          dataStoreTypeName: 'HDFS'
        },
        {
          dataStoreTypeCode: 'EXCEL',
          dataStoreTypeName: 'Microsoft Excel'
        },
        {
          dataStoreTypeCode: 'CSV',
          dataStoreTypeName: 'Delimited File (CSV)'
        },
        {
          dataStoreTypeCode: 'REST',
          dataStoreTypeName: 'REST API'
        },
        {
          dataStoreTypeCode: 'MQ',
          dataStoreTypeName: 'Messaging Queue'
        });
      }

      $scope.isDatabase = function(dataStoreTypeCode) {
        return dataStoreTypeCode && ['MYSQL','ORACLESQL','MSSQL','POSTGRESQL'].indexOf(dataStoreTypeCode) >= 0
      }

      $scope.isFile = function(dataStoreTypeCode) {
        return dataStoreTypeCode && ['CSV','EXCEL'].indexOf(dataStoreTypeCode) >= 0
      }

      $scope.isHDFS = function(dataStoreTypeCode) {
        return dataStoreTypeCode && ['HDFS'].indexOf(dataStoreTypeCode) >= 0
      }

      $scope.isWebService = function(dataStoreTypeCode) {
        return dataStoreTypeCode && ['REST'].indexOf(dataStoreTypeCode) >= 0
      }

      $scope.isMQ = function(dataStoreTypeCode) {
        return dataStoreTypeCode && ['MQ'].indexOf(dataStoreTypeCode) >= 0
      }

      $scope.resetForm = function() {
        $scope.newConn = { connectionName: '', connectionType: ''};
      }

      $scope.createConnection = function() {

      }

      $scope.getConnections();
      $scope.getStoreTypes();

  } // Controller

})();