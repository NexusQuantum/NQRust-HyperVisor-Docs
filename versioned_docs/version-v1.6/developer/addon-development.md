---
id: Add-on-development-guide
title: "Add-on Development Guide"
sidebar_position: 1
sidebar_label: Add-on Development Guide
keywords:
  - Hypervisor
  - hypervisor
  - Add-on Development
Description: How to write your own Hypervisor add-on
---

<head>
  <link rel="canonical" href="https://docs.harvesterhci.io/v1.6/developer/Add-on-development-guide"/>
</head>

Hypervisor add-ons allow you to enable and disable specific Hypervisor and third-party components based on your requirements. Add-ons function as a wrapper for the [RKE2 HelmChart resource definition (CRD)](https://docs.rke2.io/helm#using-the-helm-crd).

## Prerequisites

- An existing Hypervisor cluster

## Add-on Specifications

The `Addon` CRD supports the following fields:

```yaml
apiVersion: hypervisorhci.io/v1beta1
kind: Addon                         
metadata:
  name: example-add-on           # Name of add-on
  namespace: example-namespace  # Namespace where the add-on CRD is deployed and where the associated Kubernetes components will be deployed
  labels:                       # Optional add-on labels
    Add-on.hypervisorhci.io/experimental: "true" # Predefined label used on the Hypervisor UI to identify add-ons with the "experimental" maturity level
spec:
  enabled: false                # Boolean indicating if an add-on should be enabled or disabled on definition
  repo: https://chartsrepo.com  # Helm chart repository containing the Helm chart managed by the add-on
  version: "v0.19.0"            # Version of the Helm chart to be installed
  chart: mychart                # Name of the Helm chart in the Helm chart repository
  valuesContent: |-             # File (values.yaml) that must be passed to the Helm chart
    contents of values.yaml
    that need to be passed
    to the chart
```

:::note

Experimental add-ons are not directly packaged in Hypervisor. An example is the [rancher-vcluster](https://github.com/harvester/experimental-addons/blob/main/rancher-vcluster/rancher-vcluster.yaml) add-on.

:::

## Installation

```bash
kubectl apply -f /path/to/add-on.yaml
```

## Usage

After creating an `Addon` CRD, you can can toggle the `enabled` field to enable and disable the associated Helm chart.

## Upgrade

Changes to the `repo`, `version`, `chart` or `valueContent` fields will trigger a `helm upgrade`, which forces an upgrade of the existing Helm chart.

## Uninstallation

```bash
kubectl delete -f /path/to/Add-on.yaml
```
