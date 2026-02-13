---
sidebar_position: 3
sidebar_label: Glossary
title: "Glossary"
keywords:
- Hypervisor
- glossary
- terminology
- concepts
---

<head>
  <link rel="canonical" href="https://docs.harvesterhci.io/v1.6/getting-started/glossary"/>
</head>

## **guest cluster** / **guest Kubernetes cluster**

Group of integrated Kubernetes worker machines that run in VMs on top of a Hypervisor cluster. 

You can create RKE2, and K3s guest clusters using the Hypervisor and Rancher interfaces. Creating guest clusters involves pulling images from either the internet or a private registry.

Guest clusters form the main infrastructure for running container workloads. Certain versions of Hypervisor and Rancher allow you to deploy container workloads [directly to Hypervisor clusters](../rancher/rancher-integration.md#harvester-baremetal-container-workload-support-experimental) (with some limitations).

## **guest node** / **guest cluster node**

Kubernetes worker VM that uses guest cluster resources to run container workloads. 

Guest nodes are managed through a control plane that controls pod-related activity and maintains the desired cluster state.

## **Hypervisor cluster** 

Group of integrated physical servers (hosts) on which the Harvester hypervisor is installed. These servers collectively manage compute, memory, and storage resources to provide an environment for running VMs.

A three-node cluster is required to fully realize the multi-node features of Hypervisor, particularly high availability. Certain versions of Hypervisor allow you to create clusters with two management nodes and one [witness node](../advanced/witness.md) (and optionally, one or more worker nodes). You can also create [single-node clusters](../advanced/singlenodeclusters.md) that support most Hypervisor features (excluding high availability, multi-replica support, and live migration).

Hypervisor clusters can be imported into and managed by Rancher. Within the Rancher context, an imported Hypervisor cluster is known as a "managed cluster" or "downstream user cluster" (often abbreviated to "downstream cluster"). The Rancher term refers to any Kubernetes cluster that is connected to a Rancher server.

Certain versions of Hypervisor and Rancher allow you to deploy container workloads directly to Hypervisor clusters (with some limitations). When this [experimental feature](../rancher/rancher-integration.md#harvester-baremetal-container-workload-support-experimental) is enabled, container workloads seamlessly interact with VM workloads.

## **NQRust Hypervisor** 

Specialized operating system and [software stack](../index.md#harvester-architecture) that runs on a single physical server.

## **Hypervisor node**

Physical server on which the NQRust Hypervisor is installed. 

Each node that joins a Hypervisor cluster must be assigned a [role](../host/host.md#role-management) that determines the functions the node can perform within the cluster. All Hypervisor nodes process data but not all can store data.

## **Hypervisor Node Driver**

[Driver](../rancher/node/node-driver.md) that Rancher uses to provision VMs in a Hypervisor cluster, and to launch and manage guest Kubernetes clusters on top of those VMs.
